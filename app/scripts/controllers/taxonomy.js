'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:TaxonomyCtrl
 * @description
 * # TaxonomyCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('TaxonomyCtrl', function($scope, $stateParams, taxonFactory) {

    angular.extend($scope, taxonFactory);

    // Initialize
    if (!$stateParams.tsn || $stateParams.tsn === '0') {

      $scope.taxon = {
        complete_name: 'Tree',
        rank_name: 'All the Life.  Ever',
        tsn: 0
      };

      // Get all children
      $scope.taxonChildren(0)
        .then(function(results) {
          $scope.children = results;
        });

      // Search for specific tsn
    } else {

      // Set parent by tsn
      $scope.taxonUnit($stateParams.tsn)
        .then(function(result) {
          $scope.taxon = result;
        });

      // Get all children
      $scope.taxonChildren($stateParams.tsn)
        .then(function(results) {
          $scope.children = results;
        });
    }
  });
