const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

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
    required: true,
    trim: true,
  },
  nbHmini: {
    type: Number,
    required: false,
    default: 0,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
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
  const user = await this.findOne({ identifiant: identifiant });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("password incorrect");
  }
  throw Error("identifiant incorrect");
};

const userModel = mongoose.model("user", userSChema);
module.exports = userModel;
