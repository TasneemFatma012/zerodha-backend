const Market = require("../model/MarketModel");


exports.getMarket = async (req,res)=>{

  try {

    const data = await Market.find({});

    res.json(data);


  } catch(err){

    res.status(500).json({

      error:err.message

    });

  }

};