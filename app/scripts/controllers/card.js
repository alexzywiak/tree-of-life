

/**
 * @ngdoc function
 * @name angularApp.controller:CardctrlCtrl
 * @description
 * # CardctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CardCtrl', function ($scope, wikiFactory) {
  	'use strict';
    angular.extend($scope, wikiFactory);
  });
