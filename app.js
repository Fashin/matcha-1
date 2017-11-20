const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
var session = require("express-session");

var targets = [];
var flash = { error: "", notice: "" };

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
	cookie: { maxAge: 60000 },
	resave: false,
	saveUninitialized: true
}));
app.use(function (req, res, next) {
	req.session.user = { login: "" };
	next();
});
// SET

app.set('views', './views');
app.set('view engine', 'ejs');

// GET

app.get('/chat', function(req, res) {
    res.render('chat');
});

app.get('/myprofile', function(req, res) {
    res.render("myprofile");
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/users', function(req, res) {
    connection.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users', { users: targets });
        console.log(targets);
    });
});

app.get('/connection', function(req, res) {
    res.render('connection');
});

app.get('/users/:login', function(req, res) {
    connection.query('SELECT * FROM users WHERE login = ?', req.params.login, function (err, result, fields) {
        if (err) throw err;
        targets = result;
        res.render('users-profile', { users: targets });
        console.log(targets);
    });
});

app.get('/', function(req, res) {
	console.log(flash);
	console.log(req.session);
    res.render('index');
});

// POST

app.post('/register', function(req, res){
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
        photos: req.body.user_pics
    };
    connection.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
        if (error) throw error;
		console.log(results);
        if (results.rowsAffected == 1) {
            req.session.login = newUser.login;
            res.status(201).send("Vous êtes bien enregistré");
        }
        else
            res.status(500).send("Nous n'avons pas pu vous inscrire, ce n'est pas vous c'est nous, nous sommes désolés :(");
    });
});

app.post('/connection', function(req, res){
	console.log(flash);
    var User = {
		login: req.body.user_login,
        password: req.body.password
    };
    connection.query('SELECT * FROM users WHERE login = ?', User.login, function (error, results, fields) {
        if (error) throw error;
		if (results[0] && results[0].login) {
			if (results[0].password == User.password) {
				flash.notice = "bienvenu " + User.login;
				// res.session.user.login = User.login;
				// console.log(res.session);
				return (res.redirect("/"));
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

// Création d'un nouveau serveur
var server = http.createServer(app);

var io = require('socket.io')(http);

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Connexion, déconnexion, envoi de messages
io.on('connection', function (socket) {
    /**
     * Utilisateur connecté à la socket
     */
    var loggedUser;

    /**
     * Log de connexion et de déconnexion des utilisateurs
     */
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconected');
    });

    /**
     * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
     */
    socket.on('chat-message', function (message) {
        io.emit('chat-message', message);
    });
});

// LISTEN

server.listen(3001);
