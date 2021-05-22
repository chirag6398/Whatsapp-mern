const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const roomController = require("../controllers/roomController");
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/api/user/register", userController.Create);
router.get("/api/user/getData", userController.auth, userController.getData);

router.post("/api/user/room/create", roomController.Create);

module.exports = router;
