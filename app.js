const express		= require('express');
const bodyParser	= require('body-parser');
const http			= require('http');
const path			= require('path');
const mysql			= require('mysql');
const flash			= require('express-flash');
const session		= require("express-session");
const MemoryStore	= require('session-memory-store')(session);
const nodemailer	= require('nodemailer');
const app			= express();

var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
	  user: 'neverlandmatcha@gmail.com',
	  pass: 'matcha42'
	}
});

//SQL

var database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty',
    database : 'matcha',
    port     : 3306
});

const connection	= require('./routes/connection');
const deconnection	= require('./routes/deconnection');
const chat			= require('./routes/chat');
const myprofile		= require('./routes/myprofile');
const register		= require('./routes/register');
const update		= require('./routes/update');
const forgot_pass	= require('./routes/forgot_pass');
const users			= require('./routes/users');
const picture		= require('./routes/picture');
const index			= require('./routes/index');

// USE

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	store: new MemoryStore(),
	expires: new Date(Date.now() + 1000*60*60),
	resave: true,
	saveUninitialized: true
}));
app.use(flash());


app.use('/connection', connection);
app.use('/deconnection', deconnection);
app.use('/chat', chat);
app.use('/myprofile', myprofile);
app.use('/register', register);
app.use('/update', update);
app.use('/forgot_pass', forgot_pass);
app.use('/users', users);
app.use('/', index);
app.use('/picture', picture);

// var Session = require('express-session');
// var SessionStore = require('session-file-store')(Session);
// var session = Session({
// 	store: new SessionStore({path: __dirname+'/tmp/sessions'}),
// 	secret: 'pass',
// 	resave: true,
// 	saveUninitialized: true});

// SET

app.set('views', './views');
app.set('view engine', 'ejs');

// POST

app.use(function(req, res, next) {
	res.status(404);
	if (req.accepts('html')) {
		res.render('404', { url: req.url });
		return;
	}
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}
	res.type('txt').send('Not found');
});

//	SOCKET

var server = http.createServer(app);
var ent = require('ent');
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

// var io = require('socket.io')(server);
// var sharedsession = require("express-socket.io-session");
//
// io.use(sharedsession(session, {
//     autoSave:true
// }));

// io.on('connection', function (socket) {
//
//     socket.on("login", function(userdata) {
//         socket.handshake.session.userdata = userdata;
//         socket.handshake.session.save();
//     });
//     socket.on("logout", function(userdata) {
//         if (socket.handshake.session.userdata) {
//             delete socket.handshake.session.userdata;
//             socket.handshake.session.save();
//             socket.emit('left', userdata, Date.now());
//         }
//     });

    // console.log('a user connected');
    // socket.on('disconnect', function () {
    //     console.log('user disconected');
    // });

    // socket.on('chat-message', function (message) {
    //     message.username = loggedUser.username;
    //     io.emit('chat-message', message);
    //     console.log('Message de : ' + loggedUser.username);
    // });
// });

// LISTEN

server.listen(3001);
