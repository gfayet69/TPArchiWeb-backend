const userModel = require("../../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const { loginErrors } = require("../../utils/errors.utils");
const bcrypt = require("bcrypt");

const expirationTemps = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: expirationTemps,
  });
};

module.exports.login = async (req, res) => {
  const { identifiant, password } = req.body;
  console.log("0");
  try {
    const user = await userModel.login(identifiant, password);
    //const token = createToken(user._id);
    console.log("1");
    //res.cookie("jwt", token, { httpOnly: true, expirationTemps });
    res.status(200).json({
      _id: user._id,
      identifiant: user.identifiant,
      statut: user.statut,
      nbHmini: user.nbHmini,
    });
  } catch (err) {
    console.log("2");
    console.log(err);
    const errors = loginErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("Logout");
};

module.exports.checkCookie = async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: "non authentifié",
      });
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (e) {
    return res.status(401).send({
      message: "non authentifié",
    });
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
  console.log("1");
  try {
    const user = await userModel.findOne({
      identifiant: req.params.nom,
    });
    if (!user) {
      return res.status(400).send({ error: "utilisateur non trouvé" });
    } else {
      const auth = await bcrypt.compare(req.params.prenom, user.password);
      if (auth) {
        return res.send(user);
      }
      throw Error("password incorrect");
    }
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
