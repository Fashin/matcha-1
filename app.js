const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const mysql = require('mysql');

var targets = [];

//SQL

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty',
    database : 'matcha',
    port     : 8080
});

// USE

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
    targets = [];

    res.render('users', { users: targets });
});

app.get('/connection', function(req, res) {
    res.render('connection');
});

app.get('/users/:id', function(req, res) {
    const id = req.params.id;
    const age = '47';

    res.render('users-profile', {user_id: id, user_age: age});
});

app.get('/', function(req, res) {
    res.render('index');
});

// POST

app.post('/register', function(req, res){
    const newUser = {
		login: req.body.login,
        name: req.body.user_name,
        first_name: req.body.user_fname,
        age: req.body.user_age,
        gender: req.body.user_gender,
        preferences: req.body.user_pref,
        bio: req.body.user_bio,
        interests: req.body.user_tags,
        photos: req.body.user_pics
    };
    connection.connect();
    connection.query('INSERT INTO users SET ?', newUser, function (error, results, fields) {
        if (error) throw error;
        if (results.rowsAffected == 1) {
            req.session.login = newUser.login;
            res.status(201).send("Vous êtes bien enregistré");

        }
        else
            res.status(500).send("Nous n'avons pas pu vous inscrire, ce n'est pas vous c'est nous, nous sommes désolés :(")
    });
    connection.end();
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
