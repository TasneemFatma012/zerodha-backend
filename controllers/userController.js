const UserModel = require("../model/UserModel");




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
await UserModel.findOne({email});


if(existingUser){

return res.status(400).json({
message:"User already exists"
});

}



const user = await UserModel.create({

username: fullName,
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


exports.login = async(req,res)=>{

try{

const {email,password}=req.body;


const user = await UserModel.findOne({
email: email.trim()
});


console.log("Found user:",user);



if(!user){

return res.status(400).json({
message:"Invalid email"
});

}



if(user.password.trim() !== password.trim()){

return res.status(400).json({
message:"Invalid password"
});

}



res.json({

message:"Login successful",

userId:user._id

});


}
catch(err){

res.status(500).json({
error:err.message
});

}

};

// GET PROFILE

exports.getProfile = async(req,res)=>{

try{


const userId = req.query.id;


const user = await UserModel
.findById(userId)
.select("username role");



if(!user){

return res.status(404).json({

message:"User not found"

});

}



res.json(user);



}catch(err){

res.status(500).json({

error:err.message

});

}

};