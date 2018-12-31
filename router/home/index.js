const express= require('express');
const router = express.Router();

const needsAuth = require('../../lib/needsAuth');

router.get('/', (req, res) => {
    if(req.session.user && req.session.user.uid){
        res.send(`${req.session.user.id} is logged in`);
    }else{
        res.render('login');
    }
});

router.get('/register', needsAuth.isNotLogin, (req, res) => {
    res.render('register');
});

module.exports = router;