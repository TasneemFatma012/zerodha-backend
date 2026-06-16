const { CommodityModel } = require("../model/CommodityModel");



// GET COMMODITY STATUS

exports.getCommodity = async(req,res)=>{

try{


let data = await CommodityModel.findOne({
 userId:"user1"
});


if(!data){

data = await CommodityModel.create({

 userId:"user1",

 status:"NOT_OPEN"

});

}


res.json(data);



}catch(err){


res.status(500).json({

error:err.message

});


}

};





// OPEN COMMODITY

exports.openCommodity = async(req,res)=>{


try{


let data =
await CommodityModel.findOne({
userId:"user1"
});



if(!data){


data =
await CommodityModel.create({

userId:"user1",

status:"PENDING"

});


}else{


data.status="PENDING";


await data.save();


}



res.json(data);



}catch(err){


res.status(500).json({

error:err.message

});


}


};