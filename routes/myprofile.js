const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /myprofile");
	targets = [];
	if (req.session.login == undefined) {
		flash.error = "vous devez vous connecter";
		return(res.redirect('/connection'));
	}
    database.query('SELECT * FROM users WHERE login = ?', req.session.login, function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('myprofile', { users: targets, session: req.session, flash: req.flash });
    });
});

module.exports = router;
