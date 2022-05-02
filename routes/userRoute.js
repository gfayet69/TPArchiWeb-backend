const router = require("express").Router();
const authentification = require("../controllers/userControllers/authentification.js");
const creation = require("../controllers/creation.js");
const modification = require("../controllers/modification.js");

router.post("/register", creation.register);
router.post("/login", authentification.login);
router.put("/:id", modification.updateUser);
router.get("/:id", authentification.getOneUserById);
router.delete("/:id", modification.deleteUser);
router.get("/", authentification.getAllUsers);
router.get("/:nom/:prenom", authentification.getOneUserByNameAndFirstName);
router.get("/:id/admin", authentification.checkUserAdmin);

module.exports = router;
