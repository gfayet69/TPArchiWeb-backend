const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const coursSchema = new mongoose.Schema({
  Formation: { type: String, required: true },
  Semestre: { type: Number, required: true },
  Ref: { type: String, required: true },
  Intitulé: { type: Number, required: true },
  Statut: { type: String, required: true },
  "h/CM": { type: Number, required: false, default: 0 },
  "h/TD": { type: Number, required: false, default: 0 },
  "h/TP": { type: Number, required: false, default: 0 },
  Effectif: { type: Number, required: false, default: 0 },
  grCM: { type: Number, required: false, default: 0 },
  grTD: { type: Number, required: false, default: 0 },
  grTP: { type: Number, required: false, default: 0 },
});
module.exports = mongoose.model("cours", coursSchema);
