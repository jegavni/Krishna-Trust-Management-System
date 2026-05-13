import mongoose from "mongoose";

const complimentSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    membershipAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    specialContribution: {
      type: Number,
      default: 0,
      min: 0,
    },

    backlogAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank Transfer", "Cheque"],
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Compliment", complimentSchema);