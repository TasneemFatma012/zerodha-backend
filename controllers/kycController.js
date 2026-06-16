const KycModel = require("../model/KycModel");



// SUBMIT KYC

exports.submitKyc = async(req,res)=>{

try{


const {
userId,
fullName,
pan,
aadhaar,
email

}=req.body;



const panRegex =
/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;



if(!panRegex.test(pan)){


return res.status(400).json({

message:"Invalid PAN format"

});


}



const kyc =
await KycModel.create({

userId,

fullName,

pan,

aadhaar,

email

});



res.json(kyc);



}catch(err){


res.status(500).json({

error:err.message

});


}


};






// GET KYC

exports.getKyc = async(req,res)=>{


try{


const data =
await KycModel.findOne({

userId:req.params.userId

});



res.json(data);



}catch(err){


res.status(500).json({

error:err.message

});


}


};