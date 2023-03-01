const { body, validationResult } = require('express-validator');
require('dotenv').config();

const Comment = require('../models/Comment');

exports.comments_get = (req, res) => {
  Comment.find({ post_id: req.params.postId }) 
    .populate('author')
    .exec((err, comments) => {
      if (err) return err;
      
      res.json(comments);
    });
}
exports.comment_get = (req, res) => {
  Comment.find({ _id: req.params.commentId })
    .populate('author')
    .exec((err, comment) => {
      if (err) return err;
      
      res.json(comment);
    });
}
exports.create_comment_post = [
  // Validate and sanitize fields.
  body("message")
  .trim()
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      if (req.body.message.length < 1 || req.body.message.length > 250) {
        rej(new Error(`Message length must be between 1 and 250 characters. Current length is: ${req.body.message.length}`));
      }

      res(true);
    });
  }),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    try {
      // Create a Comment object.
      const comment = new Comment({
        message: req.body.message,
        author: req.body.author, // res.locals.currentUser._id,
        post_id: req.params.postId || req.body.post_id
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        Comment.find({})
          .exec((err, comments) => {
            if (err) return next(err);
          });

        const errorMessages = errors.errors.map((error) => error.msg);
        res.json(errorMessages);

        return;
      }

      // Data from form is valid. Save post.
      comment.save((err) => {
        if (err) {
          return next(err);
        }

        res.json(`comment: ${comment}`);
      });
    } catch (err) {
      res.json(`error: ${err}`);
    }
    
    return;
  },
];
exports.edit_comment_post = [
  // Validate and sanitize fields.
  body("message")
  .trim()
  .custom((val, {req}) => {
    return new Promise((res, rej) => {
      if (req.body.message.length < 1 || req.body.message.length > 250) {
        rej(new Error(`Message length must be between 1 and 250 characters. Current length is: ${req.body.message.length}`));
      }

      res(true);
    });
  }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // if (!res.locals.currentUser) return res.json("Not authorized");

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Comment object.
    const comment = new Comment({
      message: req.body.message,
      author: req.body.author._id,
      timestamp: req.body.timestamp,
      likes: req.body.likes,
      _id: req.params.commentId, //This is required, or a new ID will be assigned!
      post_id: req.params.postId || req.body.post_id
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      Comment.find({_id: req.params.commentId})
        .exec((err, comment) => {
          if (err) return next(err);
        });

      const errorMessages = errors.errors.map((error) => error.msg);
      res.json(errorMessages);

      return;
    }

    // Data from form is valid. Update the record.
    Comment.findOneAndUpdate({_id: req.params.commentId}, comment, {}, (err, thecomment) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new comment record.
      res.json(`Comment edited successfully: ${comment}`);
      // res.redirect("/");
    });

    return;
  },
];
exports.delete_comment_post = (req, res) => {
  // if (!res.locals.currentUser) throw new Error('You are not authorized to do that.');

  Comment.findOne({_id: req.params.commentId})
  .exec((err, comment) => {
    if (err) return err;

    // Success
    // Delete object and redirect to the comment's post.
    Comment.deleteOne(comment, (err) => {
      if (err) return err;
  
      // Success - go to comment's post
      res.json(`Comment ${comment._id} successfully deleted`);
      
      // res.redirect("/");
    });
  });

  return;
}
