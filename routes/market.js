const express=require("express");
const router=express.Router();

const Market=require("../model/MarketModel");


router.get("/",async(req,res)=>{


const data = await Market.find()
.sort({
createdAt:1
});


const formatted = data.map(item=>({

name:item.symbol || item.name,

value:item.price || item.value,

change:item.change


}));


res.json(formatted);


});


module.exports=router;