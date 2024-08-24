import { Router } from "express";
import {
  chnagePassword,
  deleteProfile,
  forgotPassword,
  login,
  logout,
  profile,
  resetPassword,
  signup,
  updateProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const userRoute = Router();
const setAvatar = upload.fields([{ name: "avatar", maxCount: 1 }]);

//////////////////////////////////////////////////////
//USER ROUTES
userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/logout", isLoggedIn, logout);
userRoute.get("/profile", isLoggedIn, profile);
userRoute.put("/update-profile", isLoggedIn, setAvatar, updateProfile);
userRoute.post("/chnage-password", isLoggedIn, chnagePassword);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);
userRoute.delete("/delete-profile", isLoggedIn, deleteProfile);

export default userRoute;
