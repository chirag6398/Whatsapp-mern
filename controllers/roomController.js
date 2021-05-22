const roomModel = require("../model/roomSchema");
const { Create } = require("./userController");

module.exports = {
  async Create(req, res) {
    const { userName, roomName } = req.body;
    console.log(req.body);
    if (!userName || !roomName) {
      return res.status(400).json({ error: "incomplete data", status: 400 });
    }
    const roomExist = await roomModel.findOne({ userName, roomName });
    if (roomExist) {
      return res.status(400).json({ error: "room exist already", status: 400 });
    } else {
      const newRoom = await roomModel.create({ userName, roomName });
      if (newRoom) {
        return res.status(200).json({ message: "room added ", status: 200 });
      } else {
        return res
          .status(400)
          .json({ error: "room does not added", status: 400 });
      }
    }
  },
};
