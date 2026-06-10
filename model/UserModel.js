const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  pan: String,
  dob: String,
  password: String,
  role: {
    type: String,
    default: "Investor",
  },
});

module.exports = mongoose.model("User", UserSchema);