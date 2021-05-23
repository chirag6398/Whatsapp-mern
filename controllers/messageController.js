const messageModel = require("../model/messageSchema");

module.exports = {
  async Create(req, res) {
    try {
      const { message, name, room, time } = req.body;
      console.log(typeof time);
      if (!message) {
        return res
          .status(400)
          .json({ error: "message not found ", status: 400 });
      }
      const result = new messageModel({
        name: name,
        roomName: room,
        time: time,
        message: message,
      });
      const msgAdd = await result.save();
      if (msgAdd) {
        return res
          .status(200)
          .json({ message: "message send successfully", status: 200 });
      } else {
        return res
          .status(400)
          .json({ error: "message not send ", status: 400 });
      }
    } catch (err) {
      console.log("messageController create func", err);
    }
  },
  async getMessage(req, res) {
    const { roomName } = req.body;

    console.log("message get", req.body);
    const data = await messageModel.find({ roomName });
    console.log("room message", data);
    res.status(200).json({ data, status: 200 });
  },
};
