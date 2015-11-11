var mysql = require('mysql');
var path = require('path');
var Promise = require('bluebird');
var express = require('express');
var _ = require('underscore');
var app = express();

app.use(express.static(path.join(__dirname, '../app')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));


var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ITIS'
});

db.connect();

var runQuery = function(query, data) {
  return new Promise(function(resolve, reject) {
    db.query(query, function(err, rows, fields) {
      if (err) {
        reject(err)
      }
      resolve(rows);
    });
  });
}

// Returns all Kingdoms
var kingdoms = function() {
  return runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where rank_id=10');
};

// Gets all children of the current tsn
var downRank = function(tsn) {
  return runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where parent_tsn=' + tsn);
};

var dummyData = function(cb) {
  var dummy = {},
    total,
    count = 0;

  kingdoms()
    .then(function(kingdoms) {

      total = kingdoms.length - 1;
      _.each(kingdoms, function(kingdom) {
        downRank(kingdom.tsn)
          .then(function(children) {
            kingdom.children = children;
            count++;
            if (count === total) {
              console.log(kingdoms);
              cb(kingdoms);
            }
          });
      });
    });
};

app.get('/dummy', function(req, res) {
  dummyData(function(data) {
    res.json(data);
  });
});

app.get('/api/downRank/:tsn', function(req, res) {
  downRank(req.params.tsn).then(function(data) {
    res.send(data);
  });
});

app.get('/api/kingdom', function(req, res) {
  kingdoms().then(function(data) {
    res.send(data);
  });
});

app.listen(3000, function() {
  console.log('listening on 3000')
});
