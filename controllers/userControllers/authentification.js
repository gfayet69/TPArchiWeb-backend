const userModel = require("../../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const { loginErrors } = require("../../utils/errors.utils");

const expirationTemps = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: expirationTemps,
  });
};

module.exports.login = async (req, res) => {
  const { identifiant, password } = req.body;

  try {
    const user = await userModel.login(identifiant, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, expirationTemps });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("Logout");
  /*ou
  res.cookie('jwt', '', { expirationTemps: 1 }) ;
  res.redirect('/') ;
*/
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
      return res.status(400).send({ error: "utilisateur non trouvé" });
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
      return res.status(400).send({ error: "identifiant non trouvé" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};
