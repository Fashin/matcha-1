let express = require('express');
let router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
 	res.render('login', { title: 'Connexion', pageController: "LoginController" });
});

module.exports = router;
