const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const enseigneSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  cours: { type: mongoose.Schema.Types.ObjectId, ref: "cours", required: true },
  grCM: { type: Number, required: true },
  grTD: { type: Number, required: true },
  grTP: { type: Number, required: true },
});
module.exports = mongoose.model("enseigne", enseigneSchema);
