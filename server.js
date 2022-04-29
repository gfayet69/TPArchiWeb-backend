const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//! Routes
app.use("/api/user", userRoute);
// !SERVER CONFIGURATION
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
