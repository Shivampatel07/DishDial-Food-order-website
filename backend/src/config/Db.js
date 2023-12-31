const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
