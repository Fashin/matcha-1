const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /users");
	targets = [];
    database.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users', { users: targets, session: req.session, flash: flash });
    });
});

router.get('/:login', function(req, res) {
	console.log("GET /users/:login");
	targets = [];
    database.query('SELECT * FROM users WHERE login = ?', req.params.login, function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users-profile', { users: targets, session: req.session, flash: flash });
    });
});

module.exports = router;
