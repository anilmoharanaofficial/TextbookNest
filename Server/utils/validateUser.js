import User from "../models/userModel.js";

const validateUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export default validateUser;
