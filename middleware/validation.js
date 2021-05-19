const asyncHandler = require("./async");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");

const validation = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.mapped();
    return next(
      new ErrorResponse(
        Object.values(messages).map((val) => val.msg),
        400
      )
    );
  }
  next();
});

module.exports = {
  validation,
};
