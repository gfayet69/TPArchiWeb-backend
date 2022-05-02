const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.updateUser = async (req, res) => {
  console.log(req.body);
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    userModel
      .findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (!err) {
          res.send(user);
        } else {
          res.send(err);
        }
      })
      .select("-password");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    userModel
      .findByIdAndDelete(req.params.id, (err, user) => {
        if (!err) {
          res.send(user, "Suppression effectuée");
        } else {
          res.send(err);
        }
      })
      .select("-password");
  } catch (err) {
    return res.status(400).send(err);
  }
};
