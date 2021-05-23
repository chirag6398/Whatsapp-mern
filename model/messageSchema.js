const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
