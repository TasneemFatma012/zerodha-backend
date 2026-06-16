const express=require("express");

const router=express.Router();


const {HoldingModel}=require("../model/HoldingModel");



router.get("/",async(req,res)=>{


const holdings =
await HoldingModel.find({});


res.json(holdings);


});


module.exports=router;