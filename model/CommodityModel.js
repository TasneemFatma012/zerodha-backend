const mongoose = require("mongoose");

const CommoditySchema = new mongoose.Schema({
  userId: String,
  status: {
    type: String,
    default: "NOT_OPEN", // NOT_OPEN | PENDING | ACTIVE
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommodityModel = mongoose.model("commodity", CommoditySchema);

module.exports = { CommodityModel };