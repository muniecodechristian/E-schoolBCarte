import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {


    name: {
      type: String,
      required: true,
      trim: true,
    },

identifier: {
  type: String,
  unique: true,   
  sparse: true,   
  lowercase: true,
  trim: true,
},



    password: {
      type: String,
      required: true,
    },


    role: {
      type: String,
      enum: ["buyer", "superadmin", "scanner","stadiumAdmin"],
      default: "buyer",
      index: true,
    },

    avatar: {
      type: String,
      default:''
    },



    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default:false,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    loginHistory: {
      type: [Date],
      default: [],
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpiresAt: {
      type: Date,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);



