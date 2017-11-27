const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /chat");
	res.render('chat', { session: req.session, flash: req.flash });
});

module.exports = router;
