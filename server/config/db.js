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
    data = data || [];
    return new Promise(function(resolve, reject) {
      db.query(query, data, function(err, rows, fields) {
        if (err) {
          reject(err)
        }
        resolve(rows);
      });
    });
  }
}
