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

    if (!$stateParams.tsn) {

      $scope.kingdoms()
        .then(function(data) {
          $scope.children = data;
        });

    } else {

      $scope.taxonUnit($stateParams.tsn)
        .then(function(result) {
        	console.log(result)
          $scope.root = result;
        });
      $scope.taxonChildren($stateParams.tsn)
        .then(function(results) {
          $scope.children = results;
        });
    }



  });
