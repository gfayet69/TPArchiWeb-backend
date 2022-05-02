const coursModel = require("../../models/coursModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getCoursById = async (req, res) => {
  console.log(req.params);
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "id not valid" });
    }
    coursModel
      .findById(req.params.id, (err, cours) => {
        if (!err) {
          res.send(cours);
        } else {
          res.send(err);
        }
      })
      .select("-password");
  } catch (err) {
    return res.status(400).send(err);
  }
};
