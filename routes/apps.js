const express = require("express");
const router = express.Router();


const {

getApps,
getAppById,
createApp,
updateApp,
deleteApp

}=require("../controllers/appsController");



router.get("/",getApps);


router.get("/:id",getAppById);


router.post("/",createApp);


router.put("/:id",updateApp);


router.delete("/:id",deleteApp);



module.exports = router;