import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const done = await mongoose.connect(process.env.MONGO_URI)
    console.log("connected")
  } catch (error) {
    console.log(error);
  }
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 9,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
