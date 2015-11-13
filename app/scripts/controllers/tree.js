'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('TreeCtrl', function ($scope, $stateParams, taxonFactory) {
    angular.extend($scope, taxonFactory);

    $scope.tsn = $stateParams.tsn;

    $scope.buildTree($scope.tsn)
    	.then(function(root){
    		$scope.root = root[0];
    	});
  });
