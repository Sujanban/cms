const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      "sujanban",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true,secure: true, sameSite: "None" });

    return res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        error: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      role: "user",
    });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: "Please Login",
      });
    }
    return res.status(200).json({
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Please Login",
    });
  }
};
module.exports = {
  login,
  register,
  getUser,
  logout,
};
