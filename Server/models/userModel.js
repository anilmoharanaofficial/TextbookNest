import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import JWT from "jsonwebtoken";
import { randomInt } from "crypto";
import crypto from "crypto";

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
    forgotPasswordOtp: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

/////////////////////////////////////////////
//PASSWORD ENCRYPTION
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(new AppError(error, 400));
  }
});

/////////////////////////////////////////////
//SET COOKISE
userSchema.methods = {
  // Generate JWT Token
  generateJWTToken: async function () {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );
  },

  //Forgot & Reset Password
  generatePasswordResetOtp: async function () {
    const resetOtp = randomInt(100000, 1000000).toString(); // This generates a 6-digit OTP
    this.forgotPasswordOtp = crypto
      .createHash("sha256")
      .update(resetOtp)
      .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    return resetOtp;
  },

  //--------------------------------------------------
  // generatePasswordResetToken: async function () {
  //   const resetToken = crypto.randomBytes(20).toString("hex");

  //   this.forgotPasswordToken = crypto
  //     .createHash("sha256")
  //     .update(resetToken)
  //     .digest("hex");
  //   this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now
  //   return resetToken;
  // },
  //--------------------------------------------------
};

const User = model("User", userSchema);

export default User;
