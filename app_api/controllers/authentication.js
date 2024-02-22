const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const register = async (req, res) => {
  const name = req.body["name"];
  const email = req.body["email"];
  const password = req.body["password"];
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.setPassword(password);

  try {
    const doc = await user.save();
    const token = doc.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login,
};
