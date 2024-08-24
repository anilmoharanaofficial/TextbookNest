import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const validateUser = async (email, password = null) => {
  if (!email) return null;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;

  if (password) {
    const isValidPassword = await bcrypt.compare(password, user.password);

    return isValidPassword ? user : null;
  }

  return user;
};

export default validateUser;
