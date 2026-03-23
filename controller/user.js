import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already Exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.status(201).json({
    message: "User Registered",
    user,
    token,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.status(200).json({
    // 🔥 also better than 201
    message: "User Loggedin",
    user,
    token,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(user);
});
