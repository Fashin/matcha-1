const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty',
    port     : 3306
});
connection.connect();

connection.query("CREATE DATABASE matcha;");

connection.end();
