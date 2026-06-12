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

// UPDATE
router.put("/:id", async(req,res)=>{

    const updatedApp = await App.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    );

    res.json(updatedApp);

});

router.get("/:id", async(req,res)=>{

    const app = await App.findById(req.params.id);

    res.json(app);

});
module.exports = router;