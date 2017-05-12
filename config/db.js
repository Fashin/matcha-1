let mysql = require('mysql');

let connect = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	passwd	: 'root',
	db		: 'tuto'
});

connect.connect()

module.exports = connect
