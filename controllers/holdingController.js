const { HoldingModel } = require("../model/HoldingModel");



exports.getHoldings = async(req,res)=>{

  try{


    let allHoldings = await HoldingModel.find({});


    res.json(allHoldings);



  }catch(err){


    res.status(500).json({

      error:err.message

    });


  }

};