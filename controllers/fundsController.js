const { FundModel } = require("../model/FundModel");




// GET FUNDS

exports.getFunds = async(req,res)=>{

try{


const funds = await FundModel.findOne({});


res.json(funds);



}catch(err){


res.status(500).json({

error:err.message

});


}

};






// ADD FUNDS

exports.addFunds = async(req,res)=>{

try{


const {amount}=req.body;



const fund =
await FundModel.findOne({});



if(!fund){

return res.status(404).json({

message:"Fund account not found"

});

}



fund.availableMargin += Number(amount);

fund.availableCash += Number(amount);

fund.payin += Number(amount);



await fund.save();



res.status(200).json(fund);



}catch(err){


res.status(500).json({

error:err.message

});


}

};







// WITHDRAW

exports.withdraw = async(req,res)=>{


try{


const {amount}=req.body;



const fund =
await FundModel.findOne();



if(!fund){


return res.status(404).json({

success:false,

message:"Fund data not found"

});


}




if(amount<=0){


return res.status(400).json({

success:false,

message:"Enter valid amount"

});


}





if(amount > fund.availableCash){


return res.status(400).json({

success:false,

message:"Insufficient balance"

});


}





fund.availableCash -= Number(amount);

fund.availableMargin -= Number(amount);



await fund.save();



res.status(200).json({

success:true,

message:`₹${amount} withdrawn successfully`,

updatedFund:fund


});



}catch(err){


res.status(500).json({

success:false,

message:"Server Error"

});


}


};