const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

const validationJWT = asyncHandler(async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return next(new ErrorResponse("No have token ", 401));
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return next(new ErrorResponse("No have token ", 401));
  }
});
module.exports = {
  validationJWT,
};
