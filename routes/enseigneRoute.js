const router = require("express").Router();
const creerEnseigne = require("../controllers/enseigneControllers/creerEnseigne.js");
const selectEnseigne = require("../controllers/enseigneControllers/selectEnseigne.js");
const modification = require("../controllers/enseigneControllers/modification.js");

//! Selection des enseignes
router.get("/", selectEnseigne.getAllEnseignes);
router.get("/id/:id", selectEnseigne.getEnseigneById);
router.get("/user/:id", selectEnseigne.getEnseignesByUser);
router.get("/cours/:id", selectEnseigne.getEnseignesByCours);

//! Création, modification et suppression d'enseignes
router.post("/register", creerEnseigne.createEnseigne);
router.put("/:id", modification.updateEnseigne);
router.delete("/:id", modification.deleteEnseigne);

//router.get("/cours/cm/:id", selectEnseigne.getNumberCM);

module.exports = router;
