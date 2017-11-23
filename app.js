const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
var session = require("express-session");

var flash = { error: null, notice: null };
var targets = []
//SQL

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty',
    database : 'matcha',
    port     : 3306
});

// USE

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	cookie: { maxAge: 1000*60*60, expires: new Date(Date.now() + 1000*60*60) },
	resave: true,
	saveUninitialized: true
}));

// SET

app.set('views', './views');
app.set('view engine', 'ejs');

// GET

app.get('/chat', function(req, res) {
	console.log("GET /chat");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    res.render('chat', { session: req.session, flash: tmp_flash });
});

app.get('/myprofile', function(req, res) {
	console.log("GET /myprofile");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    connection.query('SELECT * FROM users WHERE login = ?', req.session.login, function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('myprofile', { users: targets, session: req.session, flash: tmp_flash });
    });
});

app.get('/register', function(req, res) {
	console.log("GET /register");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    res.render('register', { session: req.session, flash: tmp_flash });
});

app.get('/update', function(req, res) {
    tmp_flash = { error: flash.error, notice: flash.notice };
    flash.error = null;
    flash.notice = null;
    res.render('update', { session: req.session, flash: tmp_flash });
});

app.get('/forgot_pass', function(req, res) {
	console.log("GET /forgot_pass");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    res.render('forgot_pass', { session: req.session, flash: tmp_flash });
});

app.get('/users', function(req, res) {
	console.log("GET /users");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    connection.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users', { users: targets, session: req.session, flash: tmp_flash });
    });
});

app.get('/connection', function(req, res) {
	console.log("GET /connection");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    res.render('connection', { session: req.session, flash: tmp_flash });
});

app.get('/deconnection', function(req, res) {
	console.log("GET /deconnection");
	req.session.destroy(function(err) {
    	res.redirect('/');
	})
});

app.get('/users/:login', function(req, res) {
	console.log("GET /users/:login");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    connection.query('SELECT * FROM users WHERE login = ?', req.params.login, function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users-profile', { users: targets, session: req.session, flash: tmp_flash });
    });
});

app.get('/', function(req, res) {
	console.log("GET /index");
	tmp_flash = { error: flash.error, notice: flash.notice };
	flash.error = null;
	flash.notice = null;
    res.render('index', { session: req.session, flash: tmp_flash });
});

// POST

app.post('/register', function(req, res) {
	console.log("POST /register");
    const newUser = {
		login: req.body.login,
		password: req.body.password,
        name: req.body.user_name,
        first_name: req.body.user_fname,
        age: req.body.user_age,
        gender: req.body.user_gender,
        preferences: req.body.user_pref,
        bio: req.body.user_bio,
        interests: req.body.user_tags,
        mail: req.body.mail
    };
    connection.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
        if (error) throw error;
		console.log(results);
        if (results.affectedRows == 1) {
            req.session.login = newUser.login;
            res.status(201).send("Vous êtes bien enregistré");
        }
        else
            res.status(500).send("Nous n'avons pas pu vous inscrire, ce n'est pas vous c'est nous, nous sommes désolés :(");
    });
});

app.post('/update', function(req, res) {
    console.log("POST /update");
    const User = {
        login: req.body.login,
        password: req.body.password,
        name: req.body.user_name,
        first_name: req.body.user_fname,
        age: req.body.user_age,
        gender: req.body.user_gender,
        preferences: req.body.user_pref,
        bio: req.body.user_bio,
        interests: req.body.user_tags,
        mail: req.body.mail
    };
    connection.query('UPDATE users SET ?', User, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if (results.affectedRows == 1) {
            req.session.login = User.login;
            res.status(201).send("Profil mis à jour");
        }
        else
            res.status(500).send("Nous n'avons pas pu modifier vos informations, ce n'est pas vous c'est nous, nous sommes désolés :(");
    });
});

app.post('/connection', function(req, res) {
	console.log("POST /connection");
    var User = {
		login: req.body.user_login,
        password: req.body.password
    };
    connection.query('SELECT * FROM users WHERE login = ?', User.login, function (error, results, fields) {
        if (error) throw error;
		if (results[0] && results[0].login) {
			if (results[0].password == User.password) {
				flash.notice = "bienvenu " + User.login;
				req.session.login = User.login;
				req.session.save(function(err) {
					if (err) return next(err);
					return (res.redirect('/'));
				});
			} else {
				flash.error = "mauvais mot de passe";
				return (res.redirect("/connection"));
			}
		} else {
			flash.error = "mauvais login";
			return (res.redirect("/connection"));
		}
    });
});

app.post('/forgot_pass', function(req, res) {
	console.log("POST /forgot_pass");
    var User = {
		login: req.body.user_login,
        password: req.body.mail
    };
	connection.query('SELECT * FROM users WHERE login = ?', User.login, function (error, results, fields) {
		if (error) throw error;
		if (results[0] && results[0].login) {
			if (results[0].mail == User.mail) {
				flash.notice = "le mail est bien evoyé a " + User.mail;
				return (res.redirect('/connection'));
			} else {
				flash.error = "mauvais mail";
				return (res.redirect("/forgot_pass"));
			}
		} else {
			flash.error = "mauvais login";
			return (res.redirect("/forgot_pass"));
		}
	});
});

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
