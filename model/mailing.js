const nodemailer	= require('nodemailer');

var mailing = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
	  user: 'neverlandmatcha@gmail.com',
	  pass: 'matcha42'
	}
});

module.exports = mailing;
