// var http = require('http');
// var url = require('url');
//
// var server = http.createServer(function(req, res) {
//     var page = url.parse(req.url).pathname;
//     console.log(page);
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     if (page == '/node/') {
//         res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
//     }
//     else if (page == '/sous-sol') {
//         res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
//     }
//     else if (page == '/etage/1/chambre') {
//         res.write('Hé ho, c\'est privé ici !');
//     }
//     res.end();
// });

var express = require('express');
var app = express()
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

router.get('/', function (req, res, next) {
	console.log(req.params.id)
  res.render('index.ejs')
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)

app.listen(8080);
