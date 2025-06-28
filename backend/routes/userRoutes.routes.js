import express from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Account, User } from "../db.js";
import { authMiddlware } from "../middleware/authMiddleware.js";
const router = express();

const signupSchema = z.object({
  email: z.string().email().trim(), ///^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    signupSchema.parse({
      email: email, //type email
      firstName: firstName,
      lastName: lastName,
      password: password,
    });

    const isPresentAlr = await User.findOne({
      email: email,
    });

    if (isPresentAlr) {
      return res.status(411).json({
        message: "User already exits",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const userCreated = await User.create({
      email: email,
      firstName: firstName || "",
      lastName: lastName || "",
      password: hashedPassword,
    });

    //sending
    if (userCreated) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      await Account.create({ userId: userCreated._id, balance: 1000 }); // mock data

      return res.status(200).json({
        message: "User created",
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "enter email and pass",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({
      message: "Enter all the dtails",
    });
  }
  const userdetails = await User.findOne({
    email: email,
  });

  // console.log(userdetails);working
  if (!userdetails) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  try {
    const isPasswordMatching = await argon2.verify(
      userdetails.password,
      password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        message: "Valid user",
        token: token,
      });
    } else {
      return res.status(411).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: error.errors });
    }
    console.log(error);
    return res.status(500).json({
      message: "Error in signin route",
    });
  }
});

router.get("/me", authMiddlware, async (req, res) => {
  try {
    const user = await User.findOne({ email: res.email }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("error getting data, are you logged in?");
  }
});

const updatingSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
});

router.put("/", authMiddlware, async (req, res) => {
  const { password, firstName, lastName } = req.body;

  const email = res.email;

  try {
    updatingSchema.parse({ firstName, lastName, password });
    const hasedPassword = await argon2.hash(password);
    const updated = await User.findOneAndUpdate(
      { email: email },
      { password: hasedPassword, firstName: firstName, lastName: lastName },
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        message: "can't update the fields , please enter valid fields",
      });
    }
    if (updated) {
      return res.status(200).json({
        message: "Updated successfully",
        updated,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "password shoud minimum contain 6 characters",
    });
  }
});

router.get("/bulk", authMiddlware, async (req, res) => {
  //somehow extract query params
  const filter = req.query.filter.toLowerCase() || "";

  // if (filter.trim()) {
  //   return res.json({
  //     user: [],
  //   });
  // }

  //find the user
  const currentUser = await User.findOne({ email: res.email });
  const currentUserId = currentUser._id;

  //not retrieve current user shit
  const users = await User.find({
    //find all the users where {currentUserId} is not this AND {firstName or lastName == filter}
    // https://stackoverflow.com/questions/52136551/mongoose-find-exclude-one-specific-document

    _id: { $ne: currentUserId },
    $or: [{ email: { $regex: filter, $options: "i" } }],

    // $or: [
    //   {email: { $regex: filter, $options: "i" } },
    // { lastName: { $regex: filter, $options: "i" } },
    // ],
  }).sort({ username: 1 });

  const user = users.map((user) => ({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id,
  }));

  return res.json({
    user: user,
  });
});
export default router;
