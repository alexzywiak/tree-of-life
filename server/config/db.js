var bluePromise = require('bluebird');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(__dirname + '/sqlite/ITIS.sqlite');

module.exports = {
  runQuery: function(query, data) {
    data = data || [];
    return new bluePromise(function(resolve, reject) {
      db.all(query, data, function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
};