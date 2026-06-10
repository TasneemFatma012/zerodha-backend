const mongoose = require("mongoose");

const FundSchema = new mongoose.Schema({
  availableMargin: Number,
  usedMargin: Number,
  availableCash: Number,
  openingBalance: Number,
  payin: Number,
  span: Number,
  exposure: Number,
  totalCollateral: Number,
});

const FundModel = mongoose.model("Fund", FundSchema);

module.exports = { FundModel };