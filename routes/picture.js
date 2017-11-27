const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const router 	= express.Router();
var fs = require('fs');

router.post('/', function(req, res) {
	console.log("POST /picture");
    const User = {
		photos: req.session.login
    };
	fs.writeFile("/tmp/"+User.photos, req.body.picture, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	});
	database.query('UPDATE users SET photos = ? WHERE login = ?', [req.session.login, req.session.login], function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results != undefined && results.affectedRows == 1) {
			req.flash('notice', "l'image a bien ete upload" );
            res.redirect("/myprofile");
        } else {
			req.flash('error', "Nous n'avons pas pu modifier vos informations, ce n'est pas vous c'est nous, nous sommes désolés :(" );
			res.redirect("/myprofile");
		}

    });
});

module.exports = router;
