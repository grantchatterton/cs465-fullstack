const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, {
            message: "Invalid username",
          });
        }

        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Invalid password",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
