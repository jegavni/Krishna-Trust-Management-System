import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: [
        ,
        "Compliment",
        "Donation",
        "Expense",
        "Backlog",
        "Opening Balance",
        "Closing Balance",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMode: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Bank Transfer",
        "Cheque",
        "Online",
      ],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Transaction",
  transactionSchema
);