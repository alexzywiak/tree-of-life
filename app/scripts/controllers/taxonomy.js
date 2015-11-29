/**
 * @ngdoc function
 * @name angularApp.controller:TaxonomyCtrl
 * @description
 * # TaxonomyCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('TaxonomyCtrl', function($scope, $stateParams, taxonFactory, wikiFactory) {
    'use strict';
    angular.extend($scope, taxonFactory, wikiFactory);

    $scope.taxon = {};
    $scope.hierarchy = {};

    // Initialize
    if (!$stateParams.tsn || $stateParams.tsn === '0') {

      $scope.taxon = {
        complete_name: 'Tree of Life',
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

      // Set main unit by tsn
      $scope.taxonUnit($stateParams.tsn)
        .then(function(result) {
          $scope.taxon = result;
        });

      // Set Children
      $scope.taxonChildren($stateParams.tsn)
        .then(function(result) {
          $scope.children = result;
        });

      // Set parent
      $scope.taxonParent($stateParams.tsn)
        .then(function(result) {
          $scope.parent = result;
        });
    }
  });
