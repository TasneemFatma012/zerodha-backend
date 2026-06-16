const express = require("express");

const router = express.Router();



const {
getHeroStats

}=require("../controllers/statsController");



router.get("/",getHeroStats);



module.exports = router;