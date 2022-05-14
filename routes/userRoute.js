const router = require("express").Router();
const authentification = require("../controllers/userControllers/authentification.js");
const creation = require("../controllers/userControllers/creation.js");
const modification = require("../controllers/userControllers/modification.js");
const check = require("../middleware/authentification.middleware.js");

//! Routes authentification
router
  .get("/", authentification.getAllUsers)
  .get("/name/:nom/:prenom", authentification.getOneUserByNameAndFirstName)
  .get("/id/:id", authentification.getOneUserById)
  .get("/identifiant/:identifiant", authentification.getOneUserByIdentifiant)
  .get("/identifiant/:identifiant/admin", check.checkUserAdmin)
  .post("/login", authentification.login)
  .get("/logout", authentification.logout);

//! Routes creation
router.post("/register", creation.register);

//! Routes modification
router
  .put("/:id", modification.updateUser)
  .delete("/:id", modification.deleteUser);

module.exports = router;
