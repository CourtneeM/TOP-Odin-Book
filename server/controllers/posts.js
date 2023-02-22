const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const Post = require('../models/Post');

exports.posts_get = (req, res) => {
  Post.find()
    .exec((err, posts) => {
      if (err) return err;
      
      res.json(posts);
    });
}
exports.post_get = (req, res) => {
  Post.find({ _id: req.params.postId })
    .exec((err, post) => {
      if (err) return err;
      
      res.json(post);
    });
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