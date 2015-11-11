var mysql = require('mysql');
var Promise = require('bluebird');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ITIS'
});

db.connect();

module.exports = {
  runQuery: function(query, data) {
    return new Promise(function(resolve, reject) {
      db.query(query, function(err, rows, fields) {
        if (err) {
          reject(err)
        }
        console.log(rows);
        resolve(rows);
      });
    });
  }
}
