const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({

name:String,

desc:String,

color:String,

icon:String,

path:String,

features:[String],

active:{
 type:Boolean,
 default:true
}

});


module.exports = mongoose.model("App",appSchema);