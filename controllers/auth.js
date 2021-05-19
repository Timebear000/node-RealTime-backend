const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

const createUser = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  const slat = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, slat);

  // Generar my JWT
  const token = await generarJWT(user.id);
  await user.save();

  res.status(200).json({
    success: true,
    user,
    token,
  });
});

//const login .... req, res ...
// {success : true, msg:'login'}
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorResponse("Email not Found", 404));
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return next(new ErrorResponse("Email not Found", 404));
  }

  //Generate  JWT
  const token = await generarJWT(user.id);

  res.status(200).json({
    success: true,
    user,
    token,
  });
});

const renewToken = asyncHandler(async (req, res, next) => {
  const uid = req.uid;

  const token = await generarJWT(uid);

  const user = await User.findById(uid);

  res.status(200).json({
    success: true,
    user,
    token,
  });
});

module.exports = {
  createUser,
  login,
  renewToken,
};
