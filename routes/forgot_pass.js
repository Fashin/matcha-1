const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const database	= require('../model/database');
const mailing	= require('../model/mailing');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /forgot_pass");
    res.render('forgot_pass', { session: req.session, flash: flash });
});

router.post('/', function(req, res) {
	console.log("POST /forgot_pass");
    var User = {
		login: req.body.user_login,
        mail: req.body.mail
    };
	database.query('SELECT * FROM users WHERE login = ?', User.login, function (error, results, fields) {
		if (error) throw error;
		if (results[0] && results[0].login) {
			if (results[0].mail == User.mail) {
				var mailOptions = {
				  from: 'neverlandMatcha@gmail.com',
				  to: User.mail,
				  subject: 'mot de passe oublié',
				  text: 'votre mot de passe est: ' + results[0].password
				};
				mailing.sendMail(mailOptions, function(error, info){
				  if (error) {
				    console.log(error);
				  } else {
				    console.log('Email sent: ' + info.response);
				  }
				});
				flash.notice = "le mail est bien evoyé a " + User.mail;
				return (res.redirect('/connection'));
			} else {
				flash.error = "mauvais mail";
				return (res.redirect("/forgot_pass"));
			}
		} else {
			flash.error = "mauvais login";
			return (res.redirect("/forgot_pass"));
		}
	});
});

module.exports = router;
