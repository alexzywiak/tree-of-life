'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CardctrlCtrl
 * @description
 * # CardctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CardCtrl', function ($scope, wikiFactory) {
    angular.extend($scope, wikiFactory);
  });
