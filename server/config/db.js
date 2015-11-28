var Promise = require('bluebird');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/itisSqlite/ITIS.sqlite');

module.exports = {
  runQuery: function(query, data) {
    data = data || [];
    console.log(query, data);
    return new Promise(function(resolve, reject) {
      db.all(query, data, function(err, rows) {
        console.log(rows);
        if (err) {
          reject(err)
        }
        resolve(rows);
      });
    });
  }
}
