
var express = require('express');
var router = express.Router();

const UserModel = require('../models/UserModel');
const md5 = require('md5');
const moment = require('moment');
const session = require('express-session');
const checkLoginMiddleware = require('../middlewares/checkLoginMiddleware');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('register failed');
            return;
        }
        res.send('success');
    });
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('login failed');
            return;
        }
        if (!data)
            return res.send('login failed');
        let {username, password, _id} = data;
        req.session.username = username;
        res.redirect('/account');
    })
});

router.post('/logout', checkLoginMiddleware, (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/login');
    });
});

module.exports = router;
