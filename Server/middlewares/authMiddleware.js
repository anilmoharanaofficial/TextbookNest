import AppError from "../utils/AppError.js";
import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthonticated, Please Login Again", 400));
  }

  const userDetails = await JWT.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};

export { isLoggedIn };
