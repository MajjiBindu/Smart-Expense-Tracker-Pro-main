const userModel = require('../db/userModel')
const { error, success } = require('../utils/handler')
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send(error(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send(error(401, "Invalid credentials"));
    }

    return res.send(success(200, user));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};


const signupContorller = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send(error(400, "All fields required"));
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send(error(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.send(success(201, "User created successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const logoutController =async (req,res) => {

}

module.exports = {
    loginController,
    logoutController,
    signupContorller
}