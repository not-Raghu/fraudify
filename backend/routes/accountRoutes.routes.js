import express from "express";
import { startSession } from "mongoose";
import { authMiddlware } from "../middleware/authMiddleware.js";
import { Account, User } from "../db.js";

const router = express.Router();

router.get("/balance", authMiddlware, async (req, res) => {
  try {
    const currentUserId = await User.findOne({ username: res.username }).select(
      "_id"
    );
    if (!currentUserId) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const currentUser = await Account.findOne({
      userId: currentUserId._id,
    }).select("balance");
    return res.status(200).json({
      balance: currentUser.balance,
    });
  } catch (error) {}
});

router.post("/transfer", authMiddlware, async (req, res) => {
  const session = await startSession();
  const { to, amount } = req.body;

  try {
    session.startTransaction();
    const currentUserId = await User.findOne({ username: res.username }).select(
      "_id"
    );

    const sendingTo = await Account.findOne({ userId: to });
    if (!sendingTo) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    console.log("sending to", sendingTo);
    const currentUserAcconut = await Account.findOne({
      userId: currentUserId._id,
    });
    if (currentUserAcconut.balance < amount) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    console.log("current user", currentUserAcconut);

    // we have sending to account and current user account ----------------------

    //now money transferrrr - start a transactionnn

    await Account.findByIdAndUpdate(currentUserAcconut._id, {
        $inc:{balance: -amount} 
    });
    await Account.findByIdAndUpdate(sendingTo._id, {
        $inc:{balance: amount}
    });

    await session.commitTransaction();
    return res.status(200).json({
      message: "transfer successful",
    });
  } catch (error) {
    console.log("transfer route error", error);
  }
});
export default router;
