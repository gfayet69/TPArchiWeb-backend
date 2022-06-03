const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

const userSchema = new mongoose.Schema({
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
    enum: ["EC", "PRAG", "PAST", "VAC", "CDE", "ATER", "Admin"],
    required: true,
    trim: true,
  },
  nbHmini: {
    type: Number,
    required: true,
    default: 192,
    min: 192,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.login = async function (identifiant, password) {
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

module.exports = mongoose.model("user", userSchema);
