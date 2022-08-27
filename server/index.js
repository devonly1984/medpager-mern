const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("I work");
});
app.use("/auth", authRoutes);
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
