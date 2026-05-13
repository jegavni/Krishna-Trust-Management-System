import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV === "production";


export const getModules = async (
  req,
  res
) => {
  try {
    const modules = await Module.find({
      enabled: true,
    });

    res.json(modules);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------- CHECK AUTH ---------------- */

// 
export const checkAuth = (req, res) => {
  console.log("Cookie length:", req.headers.cookie?.length);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      loggedIn: false,
      message: "No token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      loggedIn: true,
      user: decoded,
    });
  } catch (err) {
    res.status(401).json({
      loggedIn: false,
      message: "Invalid token",
    });
  }
};

/* ---------------- REGISTER ---------------- */

export const register = async (req, res) => {
  try {
    const { name, email, phone, location, role, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    let imageUrl = "";

    // if (req.file) {
    //   imageUrl = await new Promise((resolve, reject) => {
    //     const stream = cloudinary.uploader.upload_stream(
    //       { folder: "profiles" },
    //       (err, result) => {
    //         if (err) return reject(err);
    //         resolve(result.secure_url);
    //       }
    //     );
    //     stream.end(req.file.buffer);
    //   });
    // }

    const user = await User.create({
      name,
      email,
      phone,
      location,
      role,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    /* IMPORTANT COOKIE SETTINGS */
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    const { password: _, ...userData } = user._doc;

    res.json({
      success: true,
      user: userData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ---------------- LOGIN ---------------- */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
});
    /* COOKIE FIX */


    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// Forgot Password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
console.log("User found for email:", email, user ? "Yes" : "No");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      receiver: user.email,
      subject: "Password Reset",
      text:`
        <h2>Password Reset Request</h2>
        <p>Click the link below:</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      `
    });

    res.json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const resetPassword = async (req, res) => {
 console.log("Reset token received:", req.params.token);
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = await bcrypt.hash(
      req.body.password,
      10
    );

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- LOGOUT ---------------- */

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/"
  });

  res.json({
    success: true,
    message: "Logged out"
  });
};