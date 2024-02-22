const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const wipeUsers = false; // if true, wipes users from the DB

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    reequired: true,
  },
  name: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

const User = mongoose.model("users", userSchema);

mongoose.connection.on("connected", async () => {
  if (wipeUsers) {
    try {
      await User.deleteMany({});
    } catch (err) {
      console.error(err);
    }
  }
});

module.exports = User;
