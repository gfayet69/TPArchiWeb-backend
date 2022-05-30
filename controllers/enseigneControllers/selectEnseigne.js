const enseigneSchema = require("../../models/enseigneModel");
const userSChema = require("../../models/userModel");
const coursSchema = require("../../models/coursModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllEnseignes = async (req, res) => {
  try {
    enseigneSchema
      .find({}, (err, enseignes) => {
        if (!err) {
          res.send(enseignes);
        } else {
          res.send(err);
        }
      })
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getEnseigneById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    enseigneSchema
      .findById(req.params.id, (err, enseigne) => {
        if (!err) {
          res.send(enseigne);
        } else {
          res.send(err);
        }
      })
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getEnseignesByUser = async (req, res) => {
  try {
    enseigneSchema
      .find({ user: req.params.id }, (err, enseignes) => {
        if (!err) {
          res.send(enseignes);
        } else {
          res.send(err);
        }
      })
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getEnseignesByCours = async (req, res) => {
  const cours = await enseigneSchema.find({ cours: req.params.id });
  const calcHeureCM = cours.reduce((acc, cur) => acc + cur.grCM, 0);
  const calcHeureTD = cours.reduce((acc, cur) => acc + cur.grTD, 0);
  const calcHeureTP = cours.reduce((acc, cur) => acc + cur.grTP, 0);
  console.log(
    "calcGrpTotalCM : ",
    calcHeureCM,
    " et calculGrpTotalTD : ",
    calcHeureTD,
    " et calculGrpTotalTP : ",
    calcHeureTP
  );
  try {
    enseigneSchema
      .find({ cours: req.params.id }, (err, enseignes) => {
        if (!err) {
          res.send(enseignes);
        } else {
          res.send(err);
        }
      })
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};
