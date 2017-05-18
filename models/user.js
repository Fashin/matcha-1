var MongoClient = require('mongodb').MongoClient;
var	tab = [];

class	User {

	static create (content) {
		MongoClient.connect("mongodb://localhost/database", function(error, db) {
			if (error) throw error;
			db.collection("users").insert(content);
		});
	}

	static update (id, content){
		MongoClient.connect("mongodb://localhost/database", function(error, db) {
			if (error) throw error;
			db.collection("users").update({_id: id}, {$set: {content}})
		});
	}

	static verif(content, cb) {
		MongoClient.connect("mongodb://localhost/database", function(error, db) {
			if (error) throw error
			// console.log(content)
			db.collection("users").find({ userName : content['username'], Password : content['password'] }).toArray(function(err, items) {
				// console.log(items);
				cb(items);
			})
		})
	}
}

module.exports = User
