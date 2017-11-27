const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /index");
    res.render('index', { session: req.session, flash: flash });
});

module.exports = router;
