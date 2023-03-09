const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('./models/User');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/google/callback'
    },
    async (request, accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ email: profile.email });

      if (!user) {
        const newUser = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.email,
          password: null,
        };

        user = await User.create(newUser);
      }
      
      return done(null, user);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

// Email Passport auth

// const bcrypt = require('bcrypt');
// const LocalStrategy = require('passport-local').Strategy;

// const User = require('./models/User');

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy((username, password, done) => {
//       User.findOne({ email: username }, (err, user) => {
//         if (err) return done(err);
        
//         if (!user) {
//           return done(null, false, { message: 'No user with that username.' });
//         }

//         bcrypt.compare(password, user.password, (err, res) => {
//           if (err) return done(err);

//           if (res) {
//             // Passwords match, log user in!
//             return done(null, user);
//           } else {
//             // Passwords do not match!
//             return done(null, false, { message: 'Incorrect password' })
//           }
//         });
//       });
//     })
//   )

//   passport.serializeUser((user, done) => {
//     done(null, user.id)
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
// }