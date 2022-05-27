const coursModel = require("../../models/coursModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getCoursById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    coursModel.findById(req.params.id, (err, cours) => {
      if (!err) {
        res.send(cours);
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getAllCours = async (req, res) => {
  try {
    coursModel.find({}, (err, cours) => {
      if (!err) {
        res.send(cours);
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getCoursByEnseignant = async (req, res) => {
  try {
    coursModel.find({ enseignant: req.params.id }, (err, cours) => {
      if (!err) {
        res.send(cours);
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
