import { defaultAvatar } from "../helper/helper.js";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import validateEmail from "../utils/validateEmail.js";
import validateUser from "../utils/validateUser.js";
import cloudinary from "cloudinary";
import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/mailer.js";

/////////////////////////////////////
// Cookie Options
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days
  httpOnly: true,
  secure: true,
};

/////////////////////////////////////////////
//SIGNUP CONTROLLER
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new AppError("All fields are required", 400));

  if (!validateEmail(email))
    return next(new AppError("Please enter a valid email address", 400));

  const isUserExit = await validateUser(email);
  if (isUserExit) return next(new AppError("User already exists", 400));

  //Get Default Avatar
  const avatar = defaultAvatar();

  //Create New User Instance
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      secure_url: avatar.secure_url,
    },
  });

  if (!user) return next(new AppError("User Registretion Fiels", 400));

  //Save User
  await user.save();
  user.password = undefined;

  //Set Token
  const token = await user.generateJWTToken();
  res.cookie("token", token, cookieOptions);

  //send Response
  sendResponse(res, "User Signing Up Successfully", user);
});

/////////////////////////////////////////////
//SIGNIN CONTROLLER
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("All fields are required", 400));

  const user = await validateUser(email, password);
  if (!user)
    return next(new AppError("Email and Password dose not match", 400));

  // Set Cookies
  const token = await user.generateJWTToken();
  user.password = undefined;
  res.cookie("token", token, cookieOptions);

  //Send Response
  sendResponse(res, "User Loggedin successfully", user);
});

/////////////////////////////////////////////
//LOGOUT CONTROLLER
const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  // Send response
  sendResponse(res, "User Logged Out Successfully");
});

/////////////////////////////////////////////
//VIEW PROFILE CONTROLLER
const profile = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const user = await User.findById(userID);
  if (!user) return next(new AppError("User not found", 404));
  sendResponse(res, "User Data", user);
});

/////////////////////////////////////////////
//UPDATE PROFILE CONTROLLER
const updateProfile = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const { name, email } = req.body;
  const user = await User.findById(userID);
  if (!user) return next(new AppError("User Not Found", 500));

  if (name) user.name = name;
  if (email) user.email = email;

  // Update User Avtar
  if (req.files) {
    if (req.files.avatar) {
      const avatarDetails = await cloudinary.v2.uploader.upload(
        req.files.avatar[0].path,
        {
          folder: "TextbookNest/Avatar",
          use_filename: true,
        }
      );

      if (avatarDetails) {
        user.avatar.public_id = avatarDetails.public_id;
        user.avatar.secure_url = avatarDetails.secure_url;

        // Remove Avataa From Local Foloder
        if (fs.existsSync(`uploads/${req.files.avatar[0].filename}`)) {
          fs.rmSync(`uploads/${req.files.avatar[0].filename}`);
        }
      } else {
        throw new AppError("File upload for Cover Image failed", 500);
      }
    }
  }

  await user.save();

  //Send Response
  sendResponse(res, "User Details Updated Successfully", user);
});

/////////////////////////////////////////////
//CHNAGE PASSWORD CONTROLLER
const chnagePassword = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const { password, newPassword } = req.body;
  const user = await User.findById(userID).select("+password");
  if (!user) return next(new AppError("User Not Found", 500));

  if (!password || !newPassword)
    return next(new AppError("All Feilds Are Required", 500));

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return next(new AppError("Invalid Old Password", 400));

  user.password = newPassword;
  await user.save();
  user.password = undefined;

  //Send Response
  sendResponse(res, "Password Chnaged Successfully", user);
});

/////////////////////////////////////////////
//FORGOT PASSWORD CONTROLLER
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Email is requried", 400));
  const user = await validateUser(email);
  if (!user) return next(new AppError("Email not registered", 400));

  const resetOtp = await user.generatePasswordResetOtp();
  await user.save();

  const subject = "Reset Password";
  const message = `OTP for reset password: ${resetOtp}`;
  //Send OTP
  try {
    await sendEmail(email, subject, message);
    sendResponse(
      res,
      `Reset password token has benn sent to ${email} successfuly`
    );
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordOtp = undefined;

    await user.save();
    return next(new AppError(error.message, 400));
  }
});

/////////////////////////////////////////////
//RESET PASSWORD CONTROLLER
const resetPassword = catchAsync(async (req, res, next) => {
  const { resetOtp, password } = req.body;

  const forgotPasswordOtp = crypto
    .createHash("sha256")
    .update(resetOtp)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordOtp,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or exoired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordOtp = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  sendResponse(res, "You have reset your password successfully");
});

/////////////////////////////////////////////
//DELETE PROFILE CONTROLLER
const deleteProfile = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const user = await User.findByIdAndDelete(userID).populate("avatar");

  const avatar = user.avatar.public_id;
  if (avatar.includes("Default Avatars/avatar")) next();
  else
    await cloudinary.v2.api.delete_resources([avatar], {
      type: "upload",
      resource_type: "image",
    });

  // Remove Cookie
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  // Send response
  sendResponse(res, "Your account has been successfully deleted.");
});

export {
  signup,
  login,
  profile,
  updateProfile,
  chnagePassword,
  forgotPassword,
  resetPassword,
  deleteProfile,
  logout,
};
