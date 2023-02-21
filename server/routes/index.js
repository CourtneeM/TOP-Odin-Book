const express = require('express');
const router = express.Router();

const users_controller  = require('../controllers/users');
const posts_controller  = require('../controllers/posts');
const comments_controller  = require('../controllers/comments');

/* USER */
router.get('/logged-in-user', users_controller.logged_in_user_get);
router.post('/log-in', users_controller.log_in_post);
router.post('/log-out', users_controller.log_out_post);

router.get('/users', users_controller.users_get);
router.get('/users/:userId', users_controller.user_get);
router.get('/users/:userId/content', users_controller.user_content_get);

router.post('/users/create', users_controller.create_user_post);
router.post('/users/:userId/edit', users_controller.edit_user_post);
router.post('/users/:userId/delete', users_controller.delete_user_post);

/* POST */
router.get('/posts', posts_controller.posts_get);
router.get('/posts/:postId', posts_controller.post_get);
router.post('/posts/create', posts_controller.create_post_post);
router.post('/posts/:postId/edit', posts_controller.edit_post_post);
router.post('/posts/:postId/delete', posts_controller.delete_post_post);

/* COMMENT */
router.get('/comments', comments_controller.comments_get);
router.get('/comments/:commentId', comments_controller.comment_get);
router.post('/comments/create', comments_controller.create_comment_post);
router.post('/comments/:commentId/edit', comments_controller.edit_comment_post);
router.post('/comments/:commentId/delete', comments_controller.delete_comment_post);

module.exports = router;
