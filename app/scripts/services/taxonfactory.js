'use strict';

/**
 * @ngdoc service
 * @name angularApp.taxonFactory
 * @description
 * # taxonFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('taxonFactory', function($http) {

    var root = {
      complete_name: 'Tree',
      tsn: 0
    };

    var Node = function(obj) {
      for (var prop in obj) {
        this[prop] = obj[prop];
      }
    };

    Node.prototype.add = function(obj) {
      this.child = new Node(obj);
    };

    var children = [];
    var parent = {};

    var kingdoms = function() {
      return $http({
        method: 'GET',
        url: 'api/',
      }).then(function(results) {
        return results.data;
      });
    };

    var taxonUnit = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/' + tsn,
      }).then(function(results) {
        return results.data[0];
      });
    };

    var taxonChildren = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/children/' + tsn,
      }).then(function(results) {
        return results.data;
      });
    };

    var taxonParent = function(tsn) {
      return $http({
        method: 'GET',
        url: 'api/parent/' + tsn,
      }).then(function(results) {
        return results.data[0];
      });
    };

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
        .then(function(result) {
          var last,
              next;
          while(result.length > 1){
            last = result.pop();

            next = result[result.length - 1];

            _.each(next.children, function(child, idx){
              if(child.tsn === last.tsn){
                next.children[idx] = last;
              }
            });
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
      root: root,
      children: children,
      parent: parent
    }
  });
