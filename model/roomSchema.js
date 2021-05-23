const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
});
const roomModel = mongoose.model("room", roomSchema);
module.exports = roomModel;
