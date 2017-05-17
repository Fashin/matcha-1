let express	= require('express');
let router	= express.Router();
let user	= require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
 	req.session.aymeric = "dieu";
 	console.log(req.session);
 	res.render('index', { title: 'Express', pageController: "IndexController" });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Connexion', pageController: "LoginController" });
});

router.get('/register', function(req, res, next) {
 	console.log(req.session);
	res.render('register', { title: 'Register', pageController: "RegisterController" });
});

router.get('/profile', function(req, res, next) {
	res.render('profile', { title: 'Profile', pageController: "ProfileController" });
});

router.post('/register', function(req, res, next) {
	if (req.body.submit === "reg") {
		user.create(req.body);
		res.send('true');
	} else {
		req.flash('error', "Vous n'avez pas posté de message");
		res.send(req.flash);
	}
});

router.post("/api/login", function(req, res, next) {
	console.log(req.body);
	res.send("true");
	// tu check dans la db
	// tu return res.send();
});	

module.exports = router;
