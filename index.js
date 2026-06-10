require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {HoldingModel} = require("./model/HoldingModel");
const {PositionModel} = require("./model/PositionModel");
const {OrderModel} = require("./model/OrderModel");
const { FundModel } = require("./model/FundModel");
const { CommodityModel } = require("./model/CommodityModel");
const KycModel = require("./model/KycModel");
const { UserModel } = require("./model/UserModel");
const Market = require("./model/MarketModel");
const { validatePAN } = require("./utils/validators");

const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 5000; 
const url = process.env.MONGO_URL;

const app = express();

app.use(
  cors({

    origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", userRoutes);


app.get('/',async(req,res)=>{
  res.send("welcome to my home");
});

// Holding data fetch 

app.get('/allHoldings',async(req,res)=>{
 let allHoldings = await HoldingModel.find({});
 res.json(allHoldings);
});

app.get('/allPositions',async(req,res)=>{
 let allPositions = await PositionModel.find({});
 res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

  
    await OrderModel.create({
      name,
      qty: Number(qty),
      price: Number(price),
      mode,
    });

    console.log("Incoming Name:", name);

    let holding = await HoldingModel.findOne({ name });

    console.log("Holding Found:", holding);

    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + Number(qty);

        
        const totalCost =
          holding.avg * holding.qty +
          Number(price) * Number(qty);

        holding.avg = totalCost / totalQty;
        holding.qty = totalQty;
        holding.price = Number(price);

        await holding.save();
      } else {
        await HoldingModel.create({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "0%",
          day: "0%",
        });
      }
    }

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({
          message: "No holding found",
        });
      }

      holding.qty -= Number(qty);

      if (holding.qty <= 0) {
        await HoldingModel.deleteOne({ name });
      } else {
        holding.price = Number(price);
        await holding.save();
      }
    }

    const updatedHoldings = await HoldingModel.find({});

    res.status(200).json(updatedHoldings);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/debugHoldings", async (req, res) => {
  const holdings = await HoldingModel.find({});
  res.json(holdings);
});

app.get("/newOrder", async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({ _id: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/funds", async (req, res) => {
  try {
    const funds = await FundModel.findOne({});
    res.json(funds);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});




app.post("/addFunds", async (req, res) => {
  try {
    const { amount } = req.body;

    const fund = await FundModel.findOne({});

    if (!fund) {
      return res.status(404).json({
        message: "Fund account not found",
      });
    }

    fund.availableMargin += Number(amount);
    fund.availableCash += Number(amount);
    fund.payin += Number(amount);

    await fund.save();

    res.status(200).json(fund);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/commodity", async (req, res) => {
  try {
    let data = await CommodityModel.findOne({ userId: "user1" });

    if (!data) {
      data = await CommodityModel.create({
        userId: "user1",
        status: "NOT_OPEN",
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/commodity/open", async (req, res) => {
  try {
    let data = await CommodityModel.findOne({ userId: "user1" });

    if (!data) {
      data = await CommodityModel.create({
        userId: "user1",
        status: "PENDING",
      });
    } else {
      data.status = "PENDING";
      await data.save();
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const { userId, fullName, pan, aadhaar, email } = req.body;

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(pan)) {
      return res.status(400).json({ message: "Invalid PAN format" });
    }

    const kyc = await KycModel.create({
      userId,
      fullName,
      pan,
      aadhaar,
      email,
    });

    res.json(kyc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get KYC
app.get("/kyc/:userId", async (req, res) => {
  const data = await KycModel.findOne({ userId: req.params.userId });
  res.json(data);
});


app.post("/withdraw", async (req, res) => {
  try {
    const { amount } = req.body;

    const fund = await FundModel.findOne();

    if (!fund) {
      return res.status(404).json({
        success: false,
        message: "Fund data not found",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    if (amount > fund.availableCash) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    fund.availableCash -= amount;
    fund.availableMargin -= amount;

    await fund.save();

    res.status(200).json({
      success: true,
      message: `₹${amount} withdrawn successfully`,
      updatedFund: fund,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
app.get("/market", async (req, res) => {
  try {
    const data = await Market.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.get("/hero-stats", async (req, res) => {
  try {
    const holdings = await HoldingModel.find({});
    const orders = await OrderModel.find({});
    const funds = await FundModel.findOne({});

    const totalInvestment = holdings.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    res.json({
      totalHoldings: holdings.length,
      totalOrders: orders.length,
      availableFunds: funds?.availableMargin || 0,
      portfolioValue: totalInvestment,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/users/signup", async (req, res) => {
  try {
    const { fullName, email, phone, pan, dob, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await UserModel.create({
      username: fullName,
      email,
      phone,
      pan,
      dob,
      password, // (later bcrypt add karna)
    });

    res.json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


mongoose.connect(url)
.then(() => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});