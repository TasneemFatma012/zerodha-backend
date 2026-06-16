const { OrderModel } = require("../model/OrderModel");
const { HoldingModel } = require("../model/HoldingModel");



// GET ORDERS

exports.getOrders = async(req,res)=>{

try{

const orders =
await OrderModel.find({})
.sort({_id:-1});


res.json(orders);


}catch(err){

res.status(500).json({
error:err.message
});

}

};




// CREATE ORDER

exports.createOrder = async(req,res)=>{

try{


const {name,qty,price,mode}=req.body;



await OrderModel.create({

name,

qty:Number(qty),

price:Number(price),

mode

});



let holding =
await HoldingModel.findOne({
name
});




// BUY

if(mode==="BUY"){


if(holding){


const totalQty =
holding.qty + Number(qty);


const totalCost =
holding.avg * holding.qty +
Number(price)*Number(qty);



holding.qty=totalQty;


holding.avg=
totalCost/totalQty;


holding.price=
Number(price);



await holding.save();



}else{


await HoldingModel.create({

name,

qty:Number(qty),

avg:Number(price),

price:Number(price),

net:"0%",

day:"0%"

});


}


}



// SELL

if(mode==="SELL"){


if(!holding){

return res.status(400).json({

message:"No holding found"

});

}



holding.qty -= Number(qty);



if(holding.qty<=0){


await HoldingModel.deleteOne({
name
});


}else{


holding.price =
Number(price);


await holding.save();


}


}



res.json({

message:"Order created"

});


}catch(err){

res.status(500).json({

error:err.message

});

}


};