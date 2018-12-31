const express = require('express');
const router = express.Router();

const usersCtrl = require('./users.ctrl');
const needsAuth = require('../../lib/needsAuth');

router.get('/', needsAuth.isLogin, needsAuth.isAdmin, usersCtrl.findUsers);

router.get('/:uid', needsAuth.onlyTwoAble, usersCtrl.findUsersById);

router.put('/:uid', (req, res) => {res.end();});

router.delete('/:uid', (req, res) => {res.end();});

module.exports = router;