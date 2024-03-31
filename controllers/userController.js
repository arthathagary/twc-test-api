const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ error: "All Fields are mandatory" });
    }

    //check user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).json({ error: "User already exist" });
    } else {
      //encry the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //save the user in db
      const user = await User.create({
        email,
        password: hashedPassword,
      });

      //generate token
      const token = jwt.sign({ id: user._id }, "shhh", {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      res.status(201).json(user);
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already in use" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ error: "field are missing" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "User Missing" });
    }

    if (user && !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Password is wrong" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      var token = jwt.sign({ id: user._id }, "shhh", {
        expiresIn: "2h",
      });
    }

    user.token = token;
    user.password = undefined;

    //send token in a cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  userLogin,
};
