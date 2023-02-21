const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.index = (req, res) => {
  res.json('users route');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}