var db = require('../config/db');
var _ = require('underscore');
var Promise = require('bluebird');

// Returns all Kingdoms
var kingdoms = function() {
  return db.runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where rank_id=10');
};

// Get taxon unit
var taxonUnit = function(tsn) {
  return db.runQuery(
    'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name, h.hierarchy_string\
    FROM taxonomic_units tu, taxon_unit_types tt, hierarchy h\
    WHERE tu.tsn=? AND tt.rank_id=tu.rank_id AND tt.kingdom_id=tu.kingdom_id AND h.tsn=tu.tsn;', [tsn]
  );
};

var hierarchy = function(hierarchyString) {
  var queryStr = 'SELECT tu.complete_name, tu.rank_id, tu.tsn, tu.parent_tsn, tt.rank_name \
    FROM taxonomic_units tu, taxon_unit_types tt \
    WHERE tt.rank_id=tu.rank_id AND tt.kingdom_id=tu.kingdom_id AND (';

  var tsn = _.reduce(hierarchyString.split('-'), function(memo, cur) {
    if (memo === '') {
      return ' tu.tsn=' + cur;
    } else {
      return memo + ' or tu.tsn=' + cur;
    }
  }, '');
  queryStr += tsn + ') ORDER BY tu.rank_id ASC;';
  return db.runQuery(queryStr);
};

// Gets all children of the current tsn
var children = function(tsn) {
  return db.runQuery(
    'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
    FROM taxonomic_units tu, taxon_unit_types tt \
    WHERE tu.parent_tsn=? AND tt.rank_id=tu.rank_id AND tt.kingdom_id=tu.kingdom_id;', [tsn]
  );
};

var parent = function(tsn) {
  return db.runQuery(
    'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
    FROM taxonomic_units tu, taxon_unit_types tt \
    WHERE tu.tsn=(select parent_tsn from taxonomic_units where tsn=?) AND tt.rank_id=tu.rank_id AND tt.kingdom_id=tu.kingdom_id;', [tsn]
  );
};

var siblings = function(tsn) {
  return db.runQuery(
    'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
    FROM taxonomic_units tu, taxon_unit_types tt \
    WHERE tu.parent_tsn=(select parent_tsn from taxonomic_units where tsn=?) AND tt.rank_id=tu.rank_id AND tt.kingdom_id=tu.kingdom_id;', [tsn]
  );
};

module.exports = function(app) {
  app.route('/')
    .get(function(req, res) {
      kingdoms()
        .then(function(results) {
          res.send(results);
        });
    });

  app.route('/:tsn')
    .get(function(req, res) {
      taxonUnit(req.params.tsn)
        .then(function(results) {

          if (results[0].hierarchy_string) {
            hierarchy(results[0].hierarchy_string)
              .then(function(list) {
                results[0].hierarchy = list;
                res.send(results);
              });
          } else {
            res.send(results);
          }
        });
    });

  app.route('/children/:tsn')
    .get(function(req, res) {
      children(req.params.tsn)
        .then(function(results) {
          res.send(results);
        });
    });

  app.route('/parent/:tsn')
    .get(function(req, res) {
      parent(req.params.tsn)
        .then(function(results) {
          res.send(results);
        });
    });

  app.route('/hierarchy/:string')
    .get(function(req, res) {
      hierarchy(req.params.string)
        .then(function(result){
          res.send(result);
        });
    });
};
