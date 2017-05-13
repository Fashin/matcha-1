let connect = require('../config/db')

class	User {

	static create (content, cb) {
		console.log(content);
		// connect.query('INSERT INTO users SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
        // 	if (err) throw err
        // 		cb(result)
     //  	})
    }
}

module.exports = User
