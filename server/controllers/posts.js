const { body, validationResult } = require('express-validator');
require('dotenv').config();

const Post = require('../models/Post');

exports.posts_get = (req, res) => {
  Post.find()
    .populate('author')
    .exec((err, posts) => {
      if (err) return err;
      
      res.json(posts);
    });
}
exports.post_get = (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('author')
    .exec((err, post) => {
      if (err) return err;
      
      res.json(post);
    });
}
exports.create_post_post = [
 body("message", "Message must not be empty.")
   .trim()
   .isLength({ min: 1 })
   .escape(),

 // Process request after validation and sanitization.
 async (req, res, next) => {
   // Extract the validation errors from a request.
   const errors = validationResult(req);

   try {
     // Create a Post object.
     const post = new Post({
       message: req.body.message,
       author:  req.body.author // res.locals.currentUser._id,
     });

     if (!errors.isEmpty()) {
       const errorMessages = errors.errors.map((error) => error.msg);
       res.json(errorMessages);

       return;
     }

     // Data from form is valid. Save post.
     post.save((err) => {
       if (err) {
         return next(err);
       }

       res.json(`post: ${post}`);
     });
   } catch (err) {
     res.json(`error: ${err}`);
   }
   return;
 },
];
exports.edit_post_post = [
  // Validate and sanitize fields.
  body("message", "Message must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // if (!res.locals.currentUser) res.redirect("/");

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Post object.
    const post = new Post({
      message: req.body.message,
      author: req.body.author._id,
      timestamp: req.body.timestamp,
      likes: req.body.likes,
      _id: req.params.postId || req.body.postId, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
        const errorMessages = errors.errors.map((error) => error.msg);
        res.json(errorMessages);

        return;
    }

    // Data from form is valid. Update the record.
    Post.findOneAndUpdate({_id: req.params.postId}, post, {}, (err, thepost) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new post record.
      res.json(`Post edited successfully: ${post}`);
      // res.redirect("/");
    });

    return;
  }
];
exports.delete_post_post = (req, res) => {
   // if (!res.locals.currentUser) res.redirect("/");
   Post.findOne({_id: req.body.postId})
   .exec((err, post) => {
     if (err) return err;

     // Success
     // Delete object and redirect to the list of categories.
     Post.deleteOne(post, (err) => {
       if (err) return err;
   
       // Success - go to category list
       res.json(`Post ${req.params.postId || req.body.postId} successfully deleted`);
       
       // res.redirect("/");
     });
   });

 Comment.find({ post_id: req.body.postId})
   .exec((err, comments) => {
     if (err) return err;

     // Success
     // Delete object and redirect to the comment's post.
     comments.forEach((comment) => {
       Comment.deleteOne(comment, (err) => {
         if (err) return err;
     
       })
     });
   });

 return;
}