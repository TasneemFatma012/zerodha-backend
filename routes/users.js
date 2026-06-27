const express = require("express");

const router = express.Router();


const {

signup,
getProfile,
login

}=require("../controllers/userController");



router.post(
"/signup",
signup
);

router.post("/login",login);

router.get(
"/profile",
getProfile
);



module.exports = router;