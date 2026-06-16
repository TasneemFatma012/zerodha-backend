const { PositionModel } = require("../model/PositionModel");



exports.getPositions = async(req,res)=>{

  try{


    let allPositions = await PositionModel.find({});


    res.json(allPositions);



  }catch(err){


    res.status(500).json({

      error:err.message

    });


  }

};