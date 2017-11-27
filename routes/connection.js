const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /connection");
	res.render('connection', { session: req.session, flash: flash });
});

router.post('/', function(req, res) {
	console.log("POST /connection");
    var User = {
		login: req.body.user_login,
        password: req.body.password
    };
    database.query('SELECT * FROM users WHERE login = ?', User.login, function (error, results, fields) {
        if (error) throw error;
		if (results[0] && results[0].login) {
			if (results[0].password == User.password) {
				req.flash("notice", "bienvenu " + User.login);
				req.session.login = User.login;
				req.session.save(function(err) {
					if (err) return next(err);
					return (res.redirect('/'));
				});
			} else {
				flash.error = "mauvais mot de passe";
				return (res.redirect("/connection"));
			}
		} else {
			flash.error = "mauvais login";
			return (res.redirect("/connection"));
		}
    });
});


module.exports = router;
