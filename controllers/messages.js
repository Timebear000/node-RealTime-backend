const asyncHandler = require("../middleware/async");
const Message = require("../models/message");
const getChat = asyncHandler(async (req, res, next) => {
  const myId = req.uid;
  const messageFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: messageFrom },
      { from: messageFrom, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);
  res.status(200).json({
    success: true,
    messages: last30,
  });
});

module.exports = {
  getChat,
};
