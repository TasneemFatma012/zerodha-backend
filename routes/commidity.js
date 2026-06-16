const express = require("express");

const router = express.Router();


const {

getCommodity,

openCommodity

} = require("../controllers/commodityController");




router.get("/", getCommodity);


router.post("/open", openCommodity);



module.exports = router;