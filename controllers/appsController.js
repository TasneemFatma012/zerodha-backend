const App = require("../model/AppModel");



// GET ALL APPS

exports.getApps = async(req,res)=>{

try{


const apps = await App.find({
active:true
});


res.json(apps);


}catch(err){

res.status(500).json({

error:err.message

});

}

};




// GET SINGLE APP DETAIL

exports.getAppById = async(req,res)=>{

try{


const app = await App.findById(
req.params.id
);



if(!app){

return res.status(404).json({

message:"App not found"

});

}


res.json(app);



}catch(err){


res.status(500).json({

error:err.message

});


}


};




// CREATE APP

exports.createApp = async(req,res)=>{

try{


const newApp = new App(req.body);


await newApp.save();



res.status(201).json(newApp);



}catch(err){


res.status(500).json({

error:err.message

});


}

};




// UPDATE APP

exports.updateApp = async(req,res)=>{


try{


const updatedApp =
await App.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(updatedApp);



}catch(err){


res.status(500).json({

error:err.message

});


}


};




// DELETE APP

exports.deleteApp = async(req,res)=>{


try{


await App.findByIdAndDelete(
req.params.id
);



res.json({

message:"App deleted"

});



}catch(err){


res.status(500).json({

error:err.message

});


}


};