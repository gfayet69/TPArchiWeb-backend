const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const enseigneSchema = new mongoose.Schema({
  //   Formation: { type: String, required: true },
  //   Semestre: { type: Number, required: true },
  //   Ref: { type: String, required: true },
  //   Intitulé: { type: Number, required: true },
  Statut: { type: String, required: true },
  "h/CM": { type: Number, required: false, default: 0 },
  "h/TD": { type: Number, required: false, default: 0 },
  "h/TP": { type: Number, required: false, default: 0 },
  "h/TP": { type: Number, required: false, default: 0 },
  Effectif: { type: Number, required: false, default: 0 },
  grCM: { type: Number, required: false, default: 0 },
  grTD: { type: Number, required: false, default: 0 },
  grTP: { type: Number, required: false, default: 0 },
  enseignant: {
    type: Schema.Types.ObjectId, //https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2
    ref: "user",
    required: false,
  },
  cours: [{ type: Schema.Types.ObjectId, ref: "cours" }],
});
module.exports = mongoose.model("enseigne", enseigneSchema);
