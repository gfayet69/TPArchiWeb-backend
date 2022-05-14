const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const coursRoute = require("./routes/coursRoute.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  checkUser,
  checkAdmin,
  requireAuthentification,
} = require("./middleware/authentification.middleware.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//! Routes
app.use("/api/user", userRoute);
app.use("/api/cours", coursRoute);

//! Middleware
app.get("*", checkUser);
app.get("/jwtid", requireAuthentification, (req, res) => {
  res.status(200).json(res.locals.user._id);
});

// !SERVER CONFIGURATION
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
