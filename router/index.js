const express = require('express');
const router = express.Router();

const home =require('./home');
const users = require('./users');
const auth = require('./auth');

router.use('/', home);
router.use('/users', users);
router.use('/auth', auth);
module.exports = router;
