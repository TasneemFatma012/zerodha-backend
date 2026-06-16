const express = require("express");

const router = express.Router();


const {

submitKyc,

getKyc

}=require("../controllers/kycController");



router.post(
"/submit",
submitKyc
);



router.get(
"/:userId",
getKyc
);



module.exports = router;