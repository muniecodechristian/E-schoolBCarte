import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../middleware/utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

export const signup = async (req, res) => {
  try {
    const { name, identifier, password, role } = req.body;

    if (!name || !identifier || !password || !role) {
      return res.status(400).json({ message: "All fields required" });

    }

    if (role==="superadmin") {

     return res.status(400).json({ message: "un adminstrateur du championnant ne peut pas s'inscrire avec cette apareil!" });
      
    }

    const validRoles = ["buyer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ identifier });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this identifier" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    //const verificationToken = role === "buyer" ? Math.floor(100000 + Math.random() * 900000).toString() : null;

    const userData = {
      name,
      identifier,
      password: hashedPassword,
      role,
    isVerified:false,
  
     
    };

    if (req.file) {
      const photoUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "users/photos",
      });
      userData.avatar = photoUpload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = new User(userData);
    await user.save();

    generateTokenAndSetCookie(res, user._id);



    res.status(201).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.identifier) {
      return res.status(400).json({ message: "Identifier already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.identifier, user.name);

    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({ identifier });
    if (!user ) {
      return res.status(400).json({ success: false, message: "Invalid credentials or inactive account" });
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    user.loginHistory.push(new Date());
    await user.save();

    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true });
};

export const forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;
    const user = await User.findOne({ identifier });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = Date.now() + 3600000;
    await user.save();

    await sendPasswordResetEmail(user.identifier, `${process.env.CLIENT_URL}/reset-password/${token}`);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false });

    user.password = await bcryptjs.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.identifier);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, password, role } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (password) updateFields.password = await bcryptjs.hash(password, 12);
    if (role) updateFields.role = role;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "avatars" });
      updateFields.avatar = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};