const express	= require('express');
const session	= require("express-session");
const flash		= require('express-flash');
const router 	= express.Router();

/* GET /connection */
router.get('/', function(req, res, next) {
	console.log("GET /deconnection");
	req.session.destroy(function(err) {
    	res.redirect('/');
	})
});

module.exports = router;
