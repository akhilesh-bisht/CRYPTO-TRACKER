import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json(new ApiError(400, "Email and password are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }

    const user = await User.create({ email, password });
    const token = user.generateAccessToken();
    const userData = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .json(new ApiResponse(201, { user: userData, token }, "Registered successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Registration failed"));
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(new ApiError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid email or password"));
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json(new ApiError(401, "Invalid email or password"));
    }

    const token = user.generateAccessToken();
    const userData = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, { user: userData, token }, "Login successful"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Login failed"));
  }
};

// Logout
export const logoutUser = (_req, res) => {
  // No server action needed when using JWT stored client-side
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
};
