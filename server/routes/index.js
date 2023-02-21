const express = require('express');
const router = express.Router();

const users_controller  = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', users_controller.index);

module.exports = router;
