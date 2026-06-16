const { HoldingModel } = require("../model/HoldingModel");
const { OrderModel } = require("../model/OrderModel");
const { FundModel } = require("../model/FundModel");




exports.getHeroStats = async(req,res)=>{

try{


const holdings =
await HoldingModel.find({});


const orders =
await OrderModel.find({});


const funds =
await FundModel.findOne({});




const totalInvestment =
holdings.reduce(

(sum,item)=>

sum + item.price * item.qty,

0

);




res.json({

totalHoldings:holdings.length,


totalOrders:orders.length,


availableFunds:
funds?.availableMargin || 0,


portfolioValue:
totalInvestment


});



}catch(err){


res.status(500).json({

error:err.message

});


}


};