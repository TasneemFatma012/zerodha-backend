const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");

// Profile API
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user) {
      return res.json({
        username: "Tasneem",
        role: "Investor",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;