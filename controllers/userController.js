const { UserModel } = require("../model/UserModel");




// SIGNUP

exports.signup = async(req,res)=>{

try{


const {
fullName,
email,
phone,
pan,
dob,
password

}=req.body;



const existingUser =
await UserModel.findOne({
email
});



if(existingUser){


return res.status(400).json({

message:"User already exists"

});


}



const user =
await UserModel.create({

username:fullName,

email,

phone,

pan,

dob,

password


});




res.json({

message:"Signup successful",

user


});



}catch(err){


res.status(500).json({

error:err.message

});


}


};