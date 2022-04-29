const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.login = async (req, res) => {
  const { identifiant, password } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findOne({ identifiant });
    if (!user) {
      return res.status(400).send({ error: "id not found" });
    }
    if (password !== user.password) {
      return res.status(400).send({ error: "password incorrect" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getOneUser = async (req, res) => {
  console.log(req.params);
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    userModel
      .findById(req.params.id, (err, user) => {
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
