let express = require('express');
let router = express.Router();

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
	console.log(req.body);
	res.render('register', { title: 'Register', pageController: "RegisterController" });
});

module.exports = router;
