const mongoose = require("mongoose");
const users = require("../models/users");
const adminModel = require("../models/adminModel");
const locationModel = require("../models/location");
const skillsModel = require("../models/skills");
require("dotenv").config();
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    await users.syncIndexes();
    await adminModel.syncIndexes();
    await locationModel.syncIndexes();
    await skillsModel.syncIndexes();
  } catch (error) {
    console.log(`Error while creating MongoDB Connection : ${error}`);
  }
};