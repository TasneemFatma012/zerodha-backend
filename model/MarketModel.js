const mongoose = require("mongoose");


const MarketSchema = new mongoose.Schema({

  
  name:{
    type:String
  },


  value:{
    type:Number
  },


  
  symbol:{
    type:String
  },


  price:{
    type:Number
  },


  change:{
    type:String
  },


  createdAt:{
    type:Date,
    default:Date.now
  }

});


module.exports = mongoose.model(
  "Market",
  MarketSchema
);