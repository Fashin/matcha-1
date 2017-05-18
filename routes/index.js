let express	= require('express');
let router	= express.Router();
let user	= require('../models/user.js');
var request = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { title: 'Express', pageController: "IndexController" });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Connexion', pageController: "LoginController" });
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Register', pageController: "RegisterController" });
});

router.post('/register', function(req, res, next) {
	if (req.body.submit === "reg") {
		user.create(req.body);
	} else {
		req.send('error', "Vous n'avez pas posté de message");
		res.redirect('/register');
	}
});

router.post('/api/login', function(req, res, next) {
	// console.log(req.body);
	user.verif(req.body, function (user) {
		// console.log(user);
		if (req.body.submit === "log" && user.userName !== undefined) {
			res.send({status : "sucess", message: "Bien joue"});
		} else {
			res.send({status :'error', message: "Vous n'avez pas posté de message"});
		}
		res.end();
	});
});

module.exports = router;
