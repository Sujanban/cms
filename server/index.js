const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/userAuth");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://cms-uuv8.onrender.com",
    credentials: true,
  })
);
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const MONGO_URI =
  process.env.MONGODB_URL;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/", checkAuth, require("./routes/postRoutes"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
