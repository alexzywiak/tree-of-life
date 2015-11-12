'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('GraphCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
