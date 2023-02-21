const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.comments_get = (req, res) => {
  res.json('get comments');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.comment_get = (req, res) => {
  res.json('get comment');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.create_comment_post = (req, res) => {
  res.json('create comment post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.edit_comment_post = (req, res) => {
  res.json('edit comment post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.delete_comment_post = (req, res) => {
  res.json('delete comment post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
