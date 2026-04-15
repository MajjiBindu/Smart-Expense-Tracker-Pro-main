const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: true
    },
    savedAmount: {
      type: Number,
      default: 0
    },
    deadline: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("goals", goalSchema);