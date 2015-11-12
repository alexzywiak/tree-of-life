var db = require('../config/db');

// Returns all Kingdoms
var kingdoms = function() {
  return db.runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where rank_id=10');
};

// Get taxon unit
var taxonUnit = function(tsn) {
  return db.runQuery(
  	'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
  	FROM taxonomic_units tu, taxon_unit_types tt \
  	WHERE tu.tsn=? && tt.rank_id=tu.rank_id && tt.kingdom_id=tu.kingdom_id;', [tsn]
  	);
};

// Gets all children of the current tsn
var children = function(tsn) {
	return db.runQuery(
	'SELECT tu.complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
  	FROM taxonomic_units tu, taxon_unit_types tt \
  	WHERE tu.parent_tsn=? && tt.rank_id=tu.rank_id && tt.kingdom_id=tu.kingdom_id;', [tsn]
  	);
};

var parent = function(tsn) {
	return db.runQuery(
	'SELECT complete_name, tu.tsn, tu.parent_tsn, tt.rank_name \
  	FROM taxonomic_units tu, taxon_unit_types tt \
  	WHERE tu.tsn=(select parent_tsn from taxonomic_units where tsn=?) && tt.rank_id=tu.rank_id && tt.kingdom_id=tu.kingdom_id;', [tsn]
  	);
};

module.exports = function(app){
	app.route('/')
		.get(function(req, res){
			kingdoms()
				.then(function(results){
					res.send(results);
				});
		});

	app.route('/:tsn')
		.get(function(req, res){
			taxonUnit(req.params.tsn)
				.then(function(results){
					res.send(results);
				});
		});

	app.route('/children/:tsn')
		.get(function(req, res){
			children(req.params.tsn)
				.then(function(results){
					res.send(results);
				});
		});

	app.route('/parent/:tsn')
		.get(function(req, res){
			parent(req.params.tsn)
				.then(function(results){
					res.send(results);
				});
		});
}