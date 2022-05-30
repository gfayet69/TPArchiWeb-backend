const enseigneSchema = require("../../models/enseigneModel");
const coursSchema = require("../../models/coursModel");
const userSChema = require("../../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createEnseigne = async (req, res) => {
  try {
    const enseigne = new enseigneSchema({
      user: req.body.user,
      cours: req.body.cours,
      grCM: req.body.grCM,
      grTD: req.body.grTD,
      grTP: req.body.grTP,
    });
    const cours = await coursSchema.findById(req.body.cours);
    const coursEnseigne = await enseigneSchema.find({ cours: req.body.cours });
    const calcHeureCM = coursEnseigne.reduce((acc, cur) => acc + cur.grCM, 0);
    const calcHeureTD = coursEnseigne.reduce((acc, cur) => acc + cur.grTD, 0);
    const calcHeureTP = coursEnseigne.reduce((acc, cur) => acc + cur.grTP, 0);

    //! check s'il existe déja un cours avec ce prof
    const enseigneExist = await enseigneSchema.findOne({
      user: req.body.user,
      cours: req.body.cours,
    });
    if (enseigneExist) {
      return res
        .status(400)
        .send({ error: "Ce cours est déja attribué à cet enseignant" });
    }
    //! check si on a suffisament de groupes
    if (
      req.body.grCM + calcHeureCM > cours.grCM ||
      req.body.grTD + calcHeureTD > cours.grTD ||
      req.body.grTP + calcHeureTP > cours.grTP
    ) {
      return res
        .status(400)
        .send({ error: "Vous ne pouvez pas attribuer autant de groupe" });
    }
    //! check si on prend un group de CM et qu'un groupe de TP et/ou TP est dispo on doit le prendre
    if (
      req.body.grCM > 0 &&
      cours.grTD - calcHeureTD != 0 &&
      cours.grTP - calcHeureTP != 0 &&
      req.body.grTD == 0
    ) {
      return res.status(400).send({
        error:
          "Vous ne pouvez pas avoir uniquement un groupe de CM si un groupe de TD est disponible",
      });
    }
    if (
      req.body.grCM > 0 &&
      cours.grTD - calcHeureTD != 0 &&
      cours.grTP - calcHeureTP != 0 &&
      req.body.grTP == 0
    ) {
      return res.status(400).send({
        error:
          "Vous ne pouvez pas avoir uniquement un groupe de CM si un groupe de TP est disponible",
      });
    }
    //! on save l'enseigne
    enseigne.save((err, enseigne) => {
      if (!err) {
        res.send(enseigne);
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
