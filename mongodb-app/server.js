const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./dbConnect");
const userRoute = require("./routes/userRoutes.js");
const foodRoute = require("./routes/foodRoutes");

// const postRoute = require("./routes/postRoutes");
// const commentRoute = require("./routes/commentRoutes");
// const likeRoute = require("./routes/likeRoutes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my blogging application." });
});
const PORT = process.env.PORT || 8080;
app.use("/api/users", userRoute);
app.use("/api/foods", foodRoute);

// app.use("/api/posts", postRoute);
// app.use("/api/comments", commentRoute);
// app.use("/api/likes", likeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
