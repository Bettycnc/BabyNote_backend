const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  display: { type: Boolean, default: true },
  username: { type: String, required: true },
  lastname: { type: String, required: true },
  motherName: { type: String, required: true },
  password: { type: String, required: true },
  room: { type: Number, required: true },
  token: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
