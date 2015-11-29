/**
 * @ngdoc service
 * @name angularApp.taxonFactory
 * @description
 * # taxonFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('taxonFactory', function($http) {
    'use strict';
    // Initializes values for scopes
    var children = [];
    var parent = {};

    // Returns all kingdoms
    var kingdoms = function() {
      return $http({
        method: 'GET',
        url: 'api/',
      }).then(function(results) {
        return results.data;
      });
    };

    // Returns specificed taxon unit
    var taxonUnit = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/' + tsn,
      }).then(function(results) {
        return results.data[0];
      });
    };

    // Returns all direct children
    var taxonChildren = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/children/' + tsn,
      }).then(function(results) {
        return results.data;
      });
    };

    // Returns direct parent
    var taxonParent = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/parent/' + tsn,
      }).then(function(results) {
        return results.data[0];
      });
    };

    // Returns a flat array of all ancestors
    var hierarchy = function(string) {
      return $http({
        method: 'GET',
        url: 'api/hierarchy/' + string,
      }).then(function(results) {
        return results.data;
      });
    };

    var buildTree = function(tsn) {

      return taxonUnit(tsn)
        .then(function(result) {

          return hierarchy(result.hierarchy_string);
        })
        .then(function(hierarchy) {

          // Returns a flat array of all elements in the 
          // hierarchy string with their children
          return new Promise(function(resolve, reject) {
            var i = 0;
            var results = [];

            var sub = function(i) {
              var result;
              if (i === hierarchy.length) {
                return resolve(results);
              } else {
                var tsn = hierarchy[i].tsn;
                return taxonUnit(tsn)
                  .then(function(taxon) {
                    result = taxon;
                    return taxonChildren(tsn);
                  })
                  .then(function(children) {
                    result.children = children;
                    results.push(result);
                    sub(++i);
                  });
              }
            };

            sub(0);

          });
        })
        // Zips up the results into nested objects
        .then(function(result) {
          var last,
              next;
          while(result.length > 1){
            last = result.pop();

            // Marks the node that was passed to buildTree
            if(last.tsn === tsn){
              last.currentNode = true;
            }

            next = result[result.length - 1];
            var child;
            for(var i = 0; i < next.children.length; i++){
              child = next.children[i];
              if(child.tsn === last.tsn){
                next.children[i] = last;
              }
            }
          }

          return result;
        });
    };

    return {
      Node: Node,
      kingdoms: kingdoms,
      taxonUnit: taxonUnit,
      taxonChildren: taxonChildren,
      taxonParent: taxonParent,
      buildTree: buildTree,
      children: children,
      parent: parent
    };
  });
