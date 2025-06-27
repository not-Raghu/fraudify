import mongoose from "mongoose";
import { Schema } from "zod";

export async function connectDB() {
  try {
    const done = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 9,
      trim: true,
      unique: true
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  balance: {
    type: Number,
    required: true
  },
});

export const Account = mongoose.model("Account", AccountSchema);
export const User = mongoose.model("User", UserSchema);
