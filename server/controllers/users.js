const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.logged_in_user_get = (req, res) => {
  res.json('get logged in user');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}

exports.log_in_post = (req, res) => {
  res.json('post log in');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}

exports.log_out_post = (req, res) => {
  res.json('post log out');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}

exports.users_get = (req, res) => {
  res.json('get users');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.user_get = (req, res) => {
  res.json('get user');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.user_content_get = (req, res) => {
  res.json('get user content');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.create_user_post = (req, res) => {
  res.json('create user post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.edit_user_post = (req, res) => {
  res.json('edit user post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
exports.delete_user_post = (req, res) => {
  res.json('delete user post');
  // User.find({ is_admin: false })
  //   .exec((err, users) => {
  //     if (err) return err;
      
  //     res.send(users);
  //   });
}
