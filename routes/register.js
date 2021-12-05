var express = require('express');
var router = express.Router();
var Register = require('../modules/registerModule');

router.post('/registerUser', Register.register);
router.post('/login', Register.login);

module.exports = router;