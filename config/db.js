var MongoClient = require('mongodb').MongoClient;

var connection = MongoClient.connect('mongodb://localhost:27017/database');

module.exports = connection
