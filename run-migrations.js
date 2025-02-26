const mongoose = require("mongoose");
const skillsModel = require("./models/skills");
const locationModel = require("./models/location");
require("dotenv").config();

const skillsData = [
  { value: "ReactJS", label: "ReactJS" },
  { value: "NodeJS", label: "NodeJS" },
  { value: "Cypress", label: "Cypress" },
  { value: "Kafka", label: "Kafka" },
  { value: "NestJS", label: "NestJS" },
  { value: "SQL Server", label: "SQL Server" },
  { value: "MongoDB", label: "MongoDB" },
];

const cityStateInfo = [
  { state: "Andaman and Nicobar Islands", cities: ["Port Blair"] },
  {
    state: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  },
  {
    state: "Arunachal Pradesh",
    cities: ["Itanagar", "Naharlagun", "Pasighat"],
  },
  { state: "Assam", cities: ["Guwahati", "Silchar", "Dibrugarh", "Nagaon"] },
  { state: "Bihar", cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"] },
  { state: "Chandigarh", cities: ["Chandigarh"] },
  { state: "Chhattisgarh", cities: ["Raipur", "Bhilai Nagar", "Bilaspur"] },
  { state: "Delhi", cities: ["Delhi"] },
  { state: "Goa", cities: ["Panaji", "Margao", "Vasco-da-Gama"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara"] },
  { state: "Haryana", cities: ["Faridabad", "Gurgaon", "Hisar"] },
  { state: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli-Dharwad"] },
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
  { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
  { state: "West Bengal", cities: ["Kolkata", "Howrah", "Durgapur"] },
];

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const skill of skillsData) {
      const exists = await skillsModel.findOne({ value: skill.value });
      if (!exists) {
        await skillsModel.create(skill);
        console.log(`Inserted skill: ${skill.value}`);
      } else {
        console.log(`Skill already exists: ${skill.value}`);
      }
    }

    for (const entry of cityStateInfo) {
      const exists = await locationModel.findOne({ state: entry.state });
      if (!exists) {
        await locationModel.create(entry);
        console.log(`Inserted state: ${entry.state}`);
      } else {
        console.log(`State already exists: ${entry.state}`);
      }
    }

    console.log("✅ Migration completed successfully.");
  } catch (error) {
    console.error("❌ Error in migration:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
