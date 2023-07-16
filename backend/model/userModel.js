const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide name"] },
    email: {
      type: String,
      required: [true, "Please provide name"],
      unique: true,
    },
    password: { type: String, required: [true, "Please provide name"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
