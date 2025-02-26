const mongoose = require("mongoose");
const skillsModel = require("../models/skills");
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


async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    for (const skill of skillsData) {
      const exists = await skillsModel.findOne({ value: skill.value });
      if (!exists) {
        await skillsModel.create(skill);
        console.log(`Inserted: ${skill.value}`);
      } else {
        console.log(`Already exists: ${skill.value}`);
      }
    }

    console.log("✅ Skills migration completed.");
  } catch (error) {
    console.error("Error in skills migration:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
