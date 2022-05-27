const router = require("express").Router();
const selectionCours = require("../controllers/coursControllers/selectionCours.js");

router.get("/", selectionCours.getAllCours);
router.get("/id/:id", selectionCours.getCoursById);

module.exports = router;
