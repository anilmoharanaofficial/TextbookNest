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

const userRoute = Router();

//////////////////////////////////////////////////////
//USER ROUTES
userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/logout", logout);
userRoute.get("/profile", profile);
userRoute.put("/update-profile", updateProfile);
userRoute.post("/chnage-password", chnagePassword);
userRoute.post("/forgot", forgotPassword);
userRoute.post("/reset-password:resetToken", resetPassword);
userRoute.delete("delete", deleteProfile);

export default userRoute;
