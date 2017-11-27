const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const mysql		= require('mysql');
const router 	= express.Router();

var database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty',
    database : 'matcha',
    port     : 3306
});

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

module.exports = router;
