const mongoose = require("mongoose");

const KycSchema = new mongoose.Schema({
  userId: String,

  fullName: String,
  pan: String,
  aadhaar: String,

  panVerified: { type: Boolean, default: false },
  aadhaarLinked: { type: Boolean, default: false },

  documentUrl: String, 

  email: String,
  emailVerified: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Kyc", KycSchema);