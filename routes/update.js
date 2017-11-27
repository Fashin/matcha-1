const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /update");
    res.render('update', { session: req.session, flash: flash });
});

router.post('/', function(req, res) {
    console.log("POST /update");
    const User = {
        mail: req.body.mail,
        name: req.body.user_name,
        first_name: req.body.user_fname,
        age: req.body.user_age,
        gender: req.body.user_gender,
        preferences: req.body.user_pref,
        bio: req.body.user_bio,
        interests: req.body.user_tags
    };
    console.log(User);
    database.query('UPDATE users SET ? WHERE login = ?', [User, req.session.login], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results.affectedRows == 1) {
            flash.notice = "Profil mis à jour";
            return (res.redirect('/myprofile'));
        }
        else
            flash.error = "Nous n'avons pas pu modifier vos informations, ce n'est pas vous c'est nous, nous sommes désolés :(";
        	return (res.redirect('/myprofile'));
    });
});

module.exports = router;
