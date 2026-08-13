import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let isAdmin = false;

    if (role === "admin") {
      if (adminKey !== "ADMIN123") {
        return res.status(401).json({
          message: "Invalid Admin Secret Key",
        });
      }

      isAdmin = true;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    res.status(201).json({
      message: "Registration Successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// login user
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check Email & Password
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password",
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email",
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        // Check Role
        if (role === "admin" && !user.isAdmin) {
            return res.status(401).json({
                message: "This account is not an Admin account",
            });
        }

        if (role === "user" && user.isAdmin) {
            return res.status(401).json({
                message: "Please login as Admin",
            });
        }

        // Login Success
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.json(user);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};