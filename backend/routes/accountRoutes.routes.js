import express from "express";
import { authMiddlware } from "../middleware/authMiddleware.js";
import { Account, User } from "../db.js";

const router = express.Router();

router.get("/balance", authMiddlware, async (req, res) => {
 try {
   const currentUserId = await User.findOne({ username: res.username }).select(
    "_id"
  );
  if(!currentUserId){
    return res.status(400).json({
        message: "User not found"
    })
  }
  const currentUser = await Account.findOne({userId: currentUserId._id}).select("balance");
  return res.status(200).json({
    balance: currentUser.balance
  })
 } catch (error) {
    
 } 
});

export default router;
