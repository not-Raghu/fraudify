import express from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Account, User } from "../db.js";
import { authMiddlware } from "../middleware/authMiddleware.js";
const router = express();

const signupSchema = z.object({
  username: z.string().email(), ///^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    try {
      signupSchema.parse({
        username: username, //type email
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
    } catch (error) {
      return res.json({
        message: "Invalid schema",
      });
    }

    const isPresentAlr = await User.findOne({
      username: username,
    });

    if (isPresentAlr) {
      return res.status(411).json({
        message: "User already exits",
      });
    }

    const hashedPassword = await argon2.hash(password);
    const userCreated = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });

    //sending
    if (userCreated) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      Account.find({userId: userCreated._id}, { balance: 500})
      return res.status(200).json({
        message: "User created",
        token: token, //get's set in localstorage later (rn its set in auth bearer)
      });
    }
  } catch (error) {
    console.log("Sign up error: " + error);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const userdetails = await User.findOne({
    username: username,
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
          username,
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
    return res.status(500).json({
      message: "Error in signin route",
    });
  }
});

const updatingSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
});

router.put("/", authMiddlware, async (req, res) => {
  const { password, firstName, lastName } = req.body;

  const username = res.username;
  try {
    updatingSchema.parse({ firstName, lastName, password });
    const hasedPassword = await argon2.hash(password);
    const updated = await User.findOneAndUpdate(
      { username: username },
      { password: hasedPassword, firstName: firstName, lastName: lastName },
      { new: true }
    );
    if (updated) {
      return res.status(200).json({
        message: "Updated successfully",
        updated,
      });
    }
  } catch (error) {
    console.log("Error updating user" + error);
  }
});

router.get("/bulk", authMiddlware, async (req, res) => {
  //somehow extract query params
  const filter = req.query.filter || "";

  if(filter.trim === ""){
    return res.json({
      user: []
    })
  }

  //find the user 
  const currentUser = await User.findOne({username: res.username})
  const currentUserId = currentUser._id;


  //not retrieve current user shit
  const users = await User.find({
    //find all the users where {currentUserId} is not this AND {firstName or lastName == filter}
   // https://stackoverflow.com/questions/52136551/mongoose-find-exclude-one-specific-document

    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
    
  }).sort({username: 1});

  const user = users.map(user => ({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  }));

  return res.json({
    user: user
  })
});
export default router;
