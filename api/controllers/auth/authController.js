const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const email = req.body.email;
    const checkUserExists = await User.findOne({ email });
    if (checkUserExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPasword = bcrypt.hashSync(req.body.password, 12);
    const userCreated = await User.create({
      ...req.body,
      password: hashedPasword,
    });
    const token = jwt.sign({ userCreated }, process.env.JWT_SECRET_KEY);

    const { password, ...rest } = userCreated.toObject();

    return res.status(201).cookie("access_token", token).json({
      success: true,
      message: "User created",
      data: rest,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error occured", data: error });
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
    const { password: _, ...userData } = user.toObject();

    return res
      .status(200)
      .cookie("access_token", token)
      .json({ success: true, message: "Login successful", data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error occured", data: error });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("access_token", { httpOnly: true });
    return res
      .status(200)
      .json({ success: true, message: "logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error occured", data: error });
  }
};
module.exports = { signup, signin, logout };
