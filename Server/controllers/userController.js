import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import validateEmail from "../utils/validateEmail.js";
import validateUser from "../utils/validateUser.js";

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

  //Create New User Instance
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "",
      secure_url: "",
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
const login = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//LOGOUT CONTROLLER
const logout = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//VIEW PROFILE CONTROLLER
const profile = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//UPDATE PROFILE CONTROLLER
const updateProfile = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//CHNAGE PASSWORD CONTROLLER
const chnagePassword = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//FORGOT PASSWORD CONTROLLER
const forgotPassword = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//RESET PASSWORD CONTROLLER
const resetPassword = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////////
//DELETE PROFILE CONTROLLER
const deleteProfile = catchAsync(async (req, res, next) => {});

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
