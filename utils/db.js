const mongoose = require("mongoose");
require("dotenv").config();
module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(`Error while creating MongoDB Connection : ${error}`);
  }
};