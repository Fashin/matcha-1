var MongoClient = require('mongodb').MongoClient;

class	User {

	static create (content) {
		MongoClient.connect("mongodb://localhost/database", function(error, db) {
			if (error) throw error;
			db.collection("users").insert(content);
		});
	}
}

module.exports = User
