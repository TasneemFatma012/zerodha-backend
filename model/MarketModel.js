const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
  name: String,
  value: Number,
  change: String,
});

module.exports = mongoose.model("Market", MarketSchema);