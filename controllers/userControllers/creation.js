const { signUpErrors } = require("../../utils/errors.utils");
const userModel = require("../../models/userModel");

module.exports.register = async (req, res) => {
  console.log(req.body);
  const { identifiant, password, nom, prenom, statut, nbHmini } = req.body;
  try {
    const user = await userModel.create({
      identifiant,
      password,
      nom,
      prenom,
      statut,
      nbHmini,
    });
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};
