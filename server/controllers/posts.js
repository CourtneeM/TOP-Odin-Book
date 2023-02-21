const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.posts_get = (req, res) => {
  res.json('get posts');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.post_get = (req, res) => {
  res.json('get post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.create_post_post = (req, res) => {
  res.json('create post post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.edit_post_post = (req, res) => {
  res.json('edit post post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.delete_post_post = (req, res) => {
  res.json('delete post post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}