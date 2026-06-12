const express = require("express");
const router = express.Router();

const App = require("../model/AppModel");



router.get("/", async(req,res)=>{

    const apps = await App.find({
        active:true
    });

    res.json(apps);

});



router.post("/", async(req,res)=>{


    const newApp = new App(req.body);

    await newApp.save();


    res.json(newApp);


});


module.exports = router;