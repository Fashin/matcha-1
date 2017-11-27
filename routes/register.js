const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /register");
    res.render('register', { session: req.session, flash: req.flash });
});

router.post('/', function(req, res) {
	console.log("POST /register");
    const newUser = {
		login: req.body.login,
		password: req.body.password,
        name: req.body.user_name,
        first_name: req.body.user_fname,
        age: req.body.user_age,
        gender: req.body.user_gender,
        preferences: req.body.user_pref,
        bio: req.body.user_bio,
        interests: req.body.user_tags,
        mail: req.body.mail
    };
    database.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
        if (error) throw error;
		console.log(results);
        if (results != undefined && results.affectedRows == 1) {
            req.session.login = newUser.login;
			req.flash('notice', "Vous êtes bien enregistré" );
            res.redirect("/");
        } else {
			req.flash('error', "Nous n'avons pas pu vous inscrire, ce n'est pas vous c'est nous, nous sommes désolés :(" );
			res.redirect("/");
		}
    });
});

module.exports = router;
