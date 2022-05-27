const enseigneSchema = require("../../models/enseigneModel");
const coursSchema = require("../../models/coursModel");
const userSChema = require("../../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.updateEnseigne = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    const dataCoursActuel = await enseigneSchema.findById(req.params.id);
    const CM_actuel = dataCoursActuel.grCM;
    const TD_actuel = dataCoursActuel.grTD;
    const TP_actuel = dataCoursActuel.grTP;
    const cours_actuel = dataCoursActuel.cours;
    const coursEnseigne = await enseigneSchema.find({
      cours: dataCoursActuel.cours,
    });
    const calcHeureCM = coursEnseigne.reduce((acc, cur) => acc + cur.grCM, 0);
    const calcHeureTD = coursEnseigne.reduce((acc, cur) => acc + cur.grTD, 0);
    const calcHeureTP = coursEnseigne.reduce((acc, cur) => acc + cur.grTP, 0);
    // console.log("coursEnseigne : ", coursEnseigne);
    // console.log("dataCoursActuel : ", dataCoursActuel);
    // console.log("CM_actuel : ", CM_actuel, "calcHeureCM : ", calcHeureCM);
    // console.log("TD_actuel : ", TD_actuel, "calcHeureTD : ", calcHeureTD);
    // console.log("TP_actuel : ", TP_actuel, "calcHeureTP : ", calcHeureTP);
    enseigneSchema
      .findByIdAndUpdate(
        req.params.id,
        {
          grCM: req.body.grCM,
          grTD: req.body.grTD,
          grTP: req.body.grTP,
        },

        async (err, enseigne) => {
          const cours = await coursSchema.findById(req.body.cours);
          //! check si on a suffisament de groupes disponibles
          if (
            req.body.grCM + calcHeureCM - CM_actuel > cours.grCM ||
            req.body.grTD + calcHeureTD - TD_actuel > cours.grTD ||
            req.body.grTP + calcHeureTP - TP_actuel > cours.grTP
          ) {
            return res
              .status(400)
              .send({ error: "Vous ne pouvez pas attribuer autant de groupe" });
          }
          //! check si on prend un group de CM et qu'un groupe de TP et/ou TP est dispo on doit le prendre
          if (
            req.body.grCM > 0 &&
            cours.grTD != 0 &&
            cours.grTP != 0 &&
            (req.body.grTD == 0 || req.body.grTP == 0)
          ) {
            return res.status(400).send({
              error:
                "Vous ne pouvez pas avoir uniquement un groupe de CM si un groupe de TP ou TD est disponible",
            });
          }
          if (
            req.body.grCM > 0 &&
            cours.grTD != 0 &&
            cours.grTP == 0 &&
            req.body.grTD == 0
          ) {
            return res.status(400).send({
              error:
                "Vous ne pouvez pas avoir uniquement un groupe de CM si un groupe de TD est disponible",
            });
          }
          if (
            req.body.grCM > 0 &&
            cours.grTD == 0 &&
            cours.grTP != 0 &&
            req.body.grTP == 0
          ) {
            return res.status(400).send({
              error:
                "Vous ne pouvez pas avoir uniquement un groupe de CM si un groupe de TP est disponible",
            });
          }
          if (!err) {
            res.send(enseigne);
          } else {
            res.send(err);
          }
        }
      )
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteEnseigne = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    enseigneSchema.findByIdAndDelete(req.params.id, (err, enseigne) => {
      if (!err) {
        res.send("Suppression effectuée");
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
