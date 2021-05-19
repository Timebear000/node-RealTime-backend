const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //  Log to console for dev
  console.log(err.name);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found `;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate Key
  if (err.code === 11000) {
    const message = `동일한 값이 있습니다.`;
    error = new ErrorResponse(message, 405);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
