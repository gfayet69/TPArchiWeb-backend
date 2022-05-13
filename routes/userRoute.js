const router = require("express").Router();
const authentification = require("../controllers/userControllers/authentification.js");
const creation = require("../controllers/creation.js");
const modification = require("../controllers/modification.js");

//! Routes authentification
router.get("/", authentification.getAllUsers);
router.get("/:nom/:prenom", authentification.getOneUserByNameAndFirstName);
router.get("/:id", authentification.getOneUserById);
router.get("/:id/admin", authentification.checkUserAdmin);
router.post("/login", authentification.login);
router.get("/logout", authentification.logout);

//! Routes creation
router.post("/register", creation.register);

//! Routes modification
router.put("/:id", modification.updateUser);
router.delete("/:id", modification.deleteUser);

module.exports = router;
