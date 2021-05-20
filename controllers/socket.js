const Message = require("../models/message");
const User = require("../models/user");
const userConnection = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = true;

  await user.save();
  return user;
};

const userDisconnection = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};
const keepMessage = async (payload) => {
  /**
   * {
   *  from:"",
   *  to:"",
   *  message:""
   * }
   *
   */
  try {
    const message = new Message(payload);
    await message.save();
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  userConnection,
  userDisconnection,
  keepMessage,
};
