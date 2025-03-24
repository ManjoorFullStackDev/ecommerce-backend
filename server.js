const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/authRoutes"));
app.get("/", (req, res) => res.send("Welcome to Backend"));
const port = process.env.PORT;
dbConnect().then(() => {
  console.log("Connected to DB...");
});
app.listen(port, '0.0.0.0',() => console.log(`Server started on port: ${port}`));
