const express = require("express");

const router = express.Router();


const {

signup,
getProfile

}=require("../controllers/userController");



router.post(
"/signup",
signup
);



router.get(
"/profile",
getProfile
);



module.exports = router;