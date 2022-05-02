const userModel = require("../../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

const expirationTemps = 1000 * 60 * 60 * 24;

function createToken(id) {
  return jwt.sign(
    { id },
    process.env.TOKEN_SECRET,
    { expiresIn: expirationTemps },
    (err, token) => {
      if (err) throw err;
      return token;
    }
  );
}

module.exports.login = async (req, res) => {
  const { identifiant, password } = req.body;
  try {
    const user = await userModel.login(identifiant, password);
    const token = jwt.createToken(user._id);
    res.status(200).json({ user });
    res.cookie("jwt", token, { httpOnly: true, maxAge: expirationTemps });
    // if (!user) {
    //   return res.status(400).send({ error: "id not found" });
    // }
    // if (password !== user.password) {
    //   return res.status(400).send({ error: "password incorrect" });
    // }
    // return res.send(user);
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

module.exports.getOneUserById = async (req, res) => {
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

module.exports.getOneUserByNameAndFirstName = async (req, res) => {
  try {
    const user = await userModel
      .findOne({
        nom: req.params.nom,
        prenom: req.params.prenom,
      })
      .select("-password");
    if (!user) {
      return res.status(400).send({ error: "id not found" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getOneUserByIdentifiant = async (req, res) => {
  try {
    const user = await userModel
      .findOne({
        identifiant: req.params.identifiant,
      })
      .select("-password");
    if (!user) {
      return res.status(400).send({ error: "identifiant not found" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.checkUserAdmin = async (req, res) => {
  try {
    const user = await userModel.findOne({
      identifiant: req.params.identifiant,
      admin: true,
    });
    if (!user) {
      return res.status(400).send({
        error:
          "utilisateur inexistant ou n'a pas les autorisations nécessaires",
      });
    }
    return true;
  } catch (err) {
    return res.status(400).send(err);
  }
};
