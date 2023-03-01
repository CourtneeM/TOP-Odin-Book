const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.logged_in_user_get = (req, res) => {
  return res.json(req.user);
}

exports.log_in_post = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.json("No user exists");
    } else {
      req.logIn(user, err => {
        if (err) throw err;
        res.json('Successfully authenticated');
      })
    }
  })(req, res, next);
}

exports.log_out_post = (req, res) => {
  req.logout((err) => {
    if (err) return err;
    res.redirect("/");
  });
}

exports.users_get = (req, res) => {
  User.find()
    .exec((err, users) => {
      if (err) return err;
      
      res.json(users);
    });
}
exports.user_get = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .exec((err, user) => {
      if (err) return err;
      
      res.send(user);
    });
}
exports.user_content_get = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .exec((err, user) => {
      if (err) return err;

      Post.find({ author: user })
        .populate('author')
        .exec((err, posts) => {
          if (err) return err;

          Comment.find({ author: user })
          .populate('author')
          .exec((err, comments) => {
              if (err) return err;
    
              return res.json({ posts, comments });
            });
          });
    });
}
exports.create_user_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .custom((val, {req}) => {
      return new Promise((res, rej) => {
        User.findOne({email: req.body.email}, function(err, user) {
          if (err) {
            rej(new Error('Server Error'));
          }
          if (Boolean(user)) {
            rej(new Error(`An account for ${req.body.email} already exists.`));
          }

          res(true);
        });
      });
    }),
  body("password", "Password length must be at least 3 characters.")
  .trim()
  .isLength({ min: 3 })
  .escape(),
  body("confirm_password")
  .trim()
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      if (req.body.password !== req.body.confirm_password) {
        rej(new Error('Password and confirm password must match.'));
      }
      
      res(true);
    });
  }),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a User object.
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        User.find({})
          .exec((err, users) => {

            if (err) return next(err);
          });

        const errorMessages = {}
        errors.errors.forEach((error) => errorMessages[error.param] = error.msg);
        res.json(errorMessages);

        return;
      }

      // Data from form is valid. Save user.
      user.save((err) => {
        if (err) {
          return next(err);
        }

        res.json(`user: ${user}`);
      });
    } catch (err) {
      res.json(`error: ${err}`);
    }

    return;
  },
]
exports.edit_user_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("last_name", "Last name must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("email", "Email must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("email")
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      User.findOne({_id: req.params.userId}, function(err, user) {
        if (req.body.email === user.email) {
          res(true);
        } else {
          User.findOne({email: req.body.email}, function(err, user) {
            if (err) rej(new Error('Server Error'));
            
            if (Boolean(user)) {
              console.log('email exists');
              rej(new Error(`An account for ${req.body.email} already exists.`));
            }

            res(true);
          });
        }
      });
    });
  }),
  body("password")
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      if (req.body.password) {
        if (req.body.password.length < 3) {
          rej(new Error('Password length must be at least 3 characters.'));
        }
      }

      res(true);
    });
  }),
  body("confirmPassword")
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      if (req.body.password || !req.body.password && req.body.confirmPassword) {
        if (req.body.password !== req.body.confirmPassword) {
          rej(new Error('Password and confirm password must match.'));
        }
      }
      
      res(true);
    });
  }),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const hashedPassword = req.body.password ?
                           await bcrypt.hash(req.body.password, 10) :
                           null;

    // Create a User object.
    let user;
    if (hashedPassword) {
      user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        friends: req.body.friends,
        friend_requests: req.body.friend_requests,
        profile_picture: req.body.profile_picture,
        _id: req.params.userId || req.body.userId, //This is required, or a new ID will be assigned!
      });
    } else {
      user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        friends: req.body.friends,
        friend_requests: req.body.friend_requests,
        profile_picture: req.body.profile_picture,
        _id: req.params.userId || req.body.userId, //This is required, or a new ID will be assigned!
      });
    }

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      (err, results) => {
        if (err) {
          return next(err);
        }
      }

      const errorMessages = errors.errors.map((error) => error.msg);
      res.json(errorMessages);
      return;
    }

    // Data from form is valid. Update the record.
    User.findOneAndUpdate({_id: req.params.userId}, user, {}, (err, theuser) => {
      if (err) {
        return next(err);
      }

      res.json(`Account edited: ${user}`);
    });
  },
]
exports.delete_user_post = (req, res) => {
  User.findOne({_id: req.params.userId})
    .exec((err, user) => {
      if (err) {
        return next(err);
      }

      // Success
      // Delete object.
      User.deleteOne(user, (err) => {
        if (err) {
          return next(err);
        }

        // User successfully deleted
        res.send(`User deleted: ${user}`);
      });
    });
}
