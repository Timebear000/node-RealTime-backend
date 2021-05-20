const asyncHandler = require("../middleware/async");
const User = require("../models/user");
const getUsers = asyncHandler(async (req, res, next) => {
  const from = Number(req.query.from) || 0;
  const users = await User.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(from)
    .limit(20);

  //{success: true , users}
  res.status(200).json({
    success: true,
    users,
  });
});

module.exports = {
  getUsers,
};
