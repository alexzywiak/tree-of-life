'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:TaxonomyCtrl
 * @description
 * # TaxonomyCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('TaxonomyCtrl', function($scope, $stateParams, taxonFactory, wikiFactory) {

    angular.extend($scope, taxonFactory, wikiFactory);

    $scope.taxon = {};

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
          _.each($scope.children, function(child, idx) {
            $scope.getWiki(child.complete_name)
              .then(function(data) {
                $scope.children[idx].wiki = data;
              });
          });
        });

      // Search for specific tsn
    } else {

      // Set parent by tsn
      $scope.taxonUnit($stateParams.tsn)
        .then(function(result) {
          console.log(result);
          $scope.taxon = result;
        });

      $scope.taxonChildren($stateParams.tsn)
        .then(function(result){
          $scope.children = result;
        });

      $scope.taxonParent($stateParams.tsn)
        .then(function(result) {
          $scope.parent = result;
        });
    }
  });
