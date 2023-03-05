const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, { message: 'No user with that username.' });
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err);

          if (res) {
            // Passwords match, log user in!
            return done(null, user);
          } else {
            // Passwords do not match!
            return done(null, false, { message: 'Incorrect password' })
          }
        });
      });
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}