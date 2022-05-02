const router = require("express").Router();
const selectionCours = require("../controllers/coursControllers/selectionCours.js");

router.get("/cours/:id", selectionCours.getCoursById);

module.exports = router;
