const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoutes.js");
const foodRoute = require("./routes/foodRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my blogging application." });
});

app.use("/api/users", userRoute);
app.use("/api/foods", foodRoute);

module.exports = app;
