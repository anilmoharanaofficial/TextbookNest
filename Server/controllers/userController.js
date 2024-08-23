import catchAsync from "../utils/catchAsync.js";

/////////////////////////////////////////////
//SIGNUP CONTROLLER
const signup = catchAsync(async (req, res, next) => {});

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
