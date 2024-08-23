import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      minlength: [5, "Name must be at least 5 charchter"],
      maxlength: [50, "Name should be less that 50 charchter"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [8, "Password must be at least 8 charchter"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER_ADMIN"],
      default: "USER",
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
