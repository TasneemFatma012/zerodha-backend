const { HoldingModel } = require("../model/HoldingModel");


exports.getHoldings = async(req,res)=>{

try{


const userId = req.query.userId;



const allHoldings = await HoldingModel.find({

userId:userId

});



res.json(allHoldings);



}catch(err){


res.status(500).json({

error:err.message

});


}


};