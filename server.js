const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const coursRoute = require("./routes/coursRoute.js");
const enseigneRoute = require("./routes/enseigneRoute.js");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  checkUser,
  checkAdmin,
  requireAuthentification,
} = require("./middleware/authentification.middleware.js");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//! Routes
app.use("/api/user", userRoute);
app.use("/api/cours", coursRoute);
app.use("/api/enseigne", enseigneRoute);
//juste une reoute pour nos tests de connexion avec le front
app.use("/test", (req, res) => {
  console.log("Request received : ", moment().format("DD/MM/YY HH:mm:ss"));
  res.json({
    message: "Request received ",
  });
});

//! Middleware
//app.get("*", checkUser);
app.get("/jwtid", requireAuthentification, (req, res) => {
  res.status(200).json(res.locals.user._id);
});

// !SERVER CONFIGURATION
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
