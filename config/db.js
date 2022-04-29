const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERS_PASS +
      "@clustertp.paw5i.mongodb.net/ArchiWeb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log("Failed connection to database", err));
