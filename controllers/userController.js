const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/userSchema");
const roomModel = require("../model/roomSchema");
const hashPassword = async (password) => {
  password = await bcrypt.hash(password, 12);
  return password;
};

// const generateToken = async (userExist) => {
//   try {
//     const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);
//     console.log(token);
//     userExist.tokens.concat({ token });
//     await userExist.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
module.exports = {
  async Create(req, res) {
    try {
      let { name, email, password, cpassword } = req.body;

      if (!name || !email || !password || !cpassword) {
        return res
          .status(400)
          .json({ error: "plz fill all fields", status: 400 });
      }
      if (password != cpassword) {
        return res
          .status(400)
          .json({ error: "password does not match cpassword", status: 400 });
      }
      const existUser = await userModel.findOne({ email, name });
      if (existUser) {
        console.log(existUser);
        const isMatch = await bcrypt.compare(password, existUser.cpassword);
        if (isMatch) {
          console.log("ismatch");
          // const token = await generateToken(existUser);
          const token = await existUser.generateAuthToken();
          console.log(token);
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });

          return res
            .status(201)
            .json({ message: "user login successfully", status: 201 });
        } else {
          return res
            .status(400)
            .json({ error: "password does not match ", status: 400 });
        }
      } else {
        password = await hashPassword(password);
        cpassword = password;
        console.log("password>>>>", password);
        const newUser = userModel.create({ name, email, password, cpassword });
        if (newUser) {
          const token = await existUser.generateAuthToken();
          console.log("token", token);

          res.cookie("jwttoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });

          return res
            .status(201)
            .json({ message: "user register successefully", status: 201 });
        } else {
          return res.status(500).json({ error: "server down", status: 500 });
        }
      }
    } catch (err) {
      console.log("server error");
      return res.status(500).json({ error: "server down", status: 500 });
    }
  },

  async getData(req, res) {
    console.log(req.userName, req.rooms);
    return res
      .status(200)
      .json({ name: req.userName, rooms: req.rooms, status: 200 });
  },

  async auth(req, res, next) {
    try {
      const token = req.cookies.jwtoken;
      const isVerify = await jwt.verify(token, process.env.SECRET_KEY);
      // console.log("isverify", isVerify);
      const user = await userModel.findOne({
        _id: isVerify._id,
        "tokens.token": token,
      });
      const roomNames = await roomModel.find({ userName: user.name });
      console.log(roomNames);
      if (user) {
        req.userName = user.name;
        req.rooms = roomNames;
      } else {
        return res.status(400).json({ error: "user not logined", status: 400 });
      }
      next();
    } catch (err) {
      console.log("token not found");
    }
  },
};
