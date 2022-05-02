const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

/*class Status {
  // Create new instances of the same class as static attributes
  static EC = new Status("EC");
  static PRAG = new Status("PRAG");
  static PAST = new Status("PAST");
  static VAC = new Status("VAC");
  static CDE = new Status("CDE");
  static ATER = new Status("ATER");

  constructor(name) {
    this.name = name;
  }
}*/

const userSChema = new mongoose.Schema({
  identifiant: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  nom: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  statut: {
    type: String,
    enum: ["EC", "PRAG", "PAST", "VAC", "CDE", "ATER"],
    required: false,
    trim: true,
  },
  nbHmini: {
    type: Number,
    required: false,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

userSChema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSChema.statics.login = async function (identifiant, password) {
  const user = await this.findOne({ identifiant });
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }
  return user;
};

const userModel = mongoose.model("user", userSChema);
module.exports = userModel;
