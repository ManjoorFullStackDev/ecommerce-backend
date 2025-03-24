const mongoose = require("mongoose");
const users = require("../models/users");
const adminModel = require("../models/adminModel");
const locationModel = require("../models/location");
const skillsModel = require("../models/skills");
const registerModel = require("../models/RegisteredUser");
require("dotenv").config();
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB...");
    await users.syncIndexes();
    await adminModel.syncIndexes();
    await locationModel.syncIndexes();
    await skillsModel.syncIndexes();
    await registerModel.syncIndexes();
  } catch (error) {
    console.log(`Error while creating MongoDB Connection : ${error}`);
    process.exit(1);
  }
};
