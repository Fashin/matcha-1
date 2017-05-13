let express	= require('express');
let router	= express.Router();
var user	= require('../models/user.js');

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
		req.flash('error', "Vous n'avez pas posté de message");
		res.redirect('/register');
	}
});

module.exports = router;
