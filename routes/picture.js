const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();

router.post('/', function(req, res) {
	console.log("POST /picture");
	    const User = {
	        photos: req.body.picture,
	    };
	database.query('UPDATE users SET ? WHERE login = ?', [User, req.session.login], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results.affectedRows == 1) {
			req.flash('notice', "l'image a bien ete upload" );
            req.session.login = User.login;
            res.status(201).send("Profil mis à jour");
        }
        else
            res.status(500).send("Nous n'avons pas pu modifier vos informations, ce n'est pas vous c'est nous, nous sommes désolés :(");
    });
});

module.exports = router;
