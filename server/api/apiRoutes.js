var db = require('../config/db');

// Returns all Kingdoms
var kingdoms = function() {
  return db.runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where rank_id=10');
};

// Get taxon unit
var taxonUnit = function(tsn) {
  return db.runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where tsn=' + tsn);
};

// Gets all children of the current tsn
var children = function(tsn) {
  return db.runQuery('SELECT complete_name, tsn, parent_tsn FROM taxonomic_units where parent_tsn=' + tsn);
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
}