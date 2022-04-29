const router = require("express").Router();
const authentification = require("../controllers/authentification.js");
const creation = require("../controllers/creation.js");
const modification = require("../controllers/modification.js");

router.post("/register", creation.register);
router.post("/login", authentification.login);
router.put("/:id", modification.updateUser);
router.delete("/:id", modification.deleteUser);
router.get("/", authentification.getAllUsers);
router.get("/:id", authentification.getOneUser);

module.exports = router;
