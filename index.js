require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const appsRoute = require("./routes/apps");
const orderRoute = require("./routes/orders");
const holdingRoute = require("./routes/holdings");
const fundRoute = require("./routes/funds");
const marketRoute = require("./routes/market");
const kycRoute = require("./routes/kyc");
const userRoute = require("./routes/users");


const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors({
 origin:[
 "http://localhost:5173",
 "http://localhost:3000",
 "https://zerodha-dashboard-bsmvs8m5g-tasneemfatma012s-projects.vercel.app"
 ],
 credentials:true
}));


app.use(express.json());



// routes

app.use("/apps",appsRoute);

app.use("/orders",orderRoute);

app.use("/holdings",holdingRoute);

app.use("/funds",fundRoute);

app.use("/market",marketRoute);

app.use("/kyc",kycRoute);

app.use("/users",userRoute);




mongoose.connect(process.env.MONGO_URL)

.then(()=>{

console.log("MongoDB Connected");


app.listen(PORT,()=>{

console.log(`Server running ${PORT}`);

});


})
.catch(err=>console.log(err));