import userModel from "../db/userModel.js";
import { error, success } from "../utils/handler.js";
import bcrypt from "bcryptjs";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.send(error(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send(error(401, "Invalid credentials"));
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.send(success(200, userData));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

export const signupContorller = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await userModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.send(error(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.send(success(201, "User created successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

export const logoutController = async (req, res) => {
  return res.send(success(200, "Logged out successfully"));
};
