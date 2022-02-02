var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-commerce Website', link: 'ayush-e-commerce-website.netlify.app' });
});

module.exports = router;
