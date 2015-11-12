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

    var taxonParent = function(tsn){
      return $http({
        method: 'GET',
        url: 'api/parent/' + tsn,
      }).then(function(results) {
        return results.data[0];
      });
    };

    return {
      kingdoms: kingdoms,
      taxonUnit: taxonUnit,
      taxonChildren: taxonChildren,
      taxonParent: taxonParent,
      root: root,
      children: children,
      parent: parent
    }
  });
