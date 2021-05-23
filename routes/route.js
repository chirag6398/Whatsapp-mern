const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const roomController = require("../controllers/roomController");
const messageController = require("../controllers/messageController");

router.post("/api/user/register", userController.Create);
router.get("/api/user/getData", userController.auth, userController.getData);

router.post("/api/user/room/create", roomController.Create);

router.post("/api/user/message/create", messageController.Create);
router.post("/api/user/messages/get", messageController.getMessage);
module.exports = router;
