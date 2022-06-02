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
  const tab = [];
  const tab2 = [];
  try {
    enseigneSchema.find({ cours: req.params.id }, (err, enseignes) => {
      const grCM = enseignes.map((enseigne) => enseigne.grCM);
      if (!err) {
        //console.log(enseignes);
        const user = enseignes.map((enseigne) => enseigne.user);

        var ePromise = user.map(async function (id) {
          var user = await userSChema.findById(id);
          console.log(user);
          console.log(grCM);
          return user;
        });
        Promise.all(ePromise).then(function (user) {
          console.log(grCM);
          res.send(user);
        });
        return 1;
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getUCUser = async (req, res) => {
  try {
    enseigneSchema
      .find({ user: req.params.id }, (err, enseignes) => {
        if (!err) {
          const tabCM = [];
          const tabTD = [];
          const tabTP = [];
          const grCM = enseignes.map((enseigne) => enseigne.grCM);
          const grTD = enseignes.map((enseigne) => enseigne.grTD);
          const grTP = enseignes.map((enseigne) => enseigne.grTP);
          const HcoursCM = enseignes.map((enseigne) => enseigne.cours["h/CM"]);
          const HcoursTD = enseignes.map((enseigne) => enseigne.cours["h/TD"]);
          const HcoursTP = enseignes.map((enseigne) => enseigne.cours["h/TP"]);
          for (i = 0; i < grCM.length; i++) {
            tabCM.push(grCM[i] * HcoursCM[i]);
            tabTD.push(grTD[i] * HcoursTD[i]);
            tabTP.push(grTP[i] * HcoursTP[i]);
          }
          /*
          for (i = 0; i < tabCM.length; i++) {
            CMsum += tabCM[i];
            TDsum += tabTD[i];
            TPsum += tabTP[i];
          }*/
          const CMsum = tabCM.reduce((a, b) => a + b, 0);
          const TDsum = tabTD.reduce((a, b) => a + b, 0);
          const TPsum = tabTP.reduce((a, b) => a + b, 0);
          console.log(CMsum, TDsum, TPsum);

          // nbUcCM = nbGroupCM * CoefCM * nbHeureCM;
          // nbUcTD = nbGroupTD * CoefTD * nbHeureTD;
          // nbUcTP = nbGroupTP * CoefTP * nbHeureTP;
          // nbUcT = nbUcCM + nbUcTD + nbUcTP;

          console.log("tabCM", tabCM, "tabTD", tabTD, "tabTP", tabTP);
          res.send({ CMsum, TDsum, TPsum });
        } else {
          res.send(err);
        }
      })
      .populate("cours");
  } catch (err) {
    return res.status(400).send(err);
  }
};
