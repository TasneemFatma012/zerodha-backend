const express = require("express");

const router = express.Router();



const {

getFunds,

addFunds,

withdraw


}=require("../controllers/fundsController");





router.get("/",getFunds);



router.post("/add",addFunds);



router.post("/withdraw",withdraw);




module.exports = router;