'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:hierarchy
 * @description
 * # hierarchy
 */
angular.module('angularApp')
  .directive('hierarchy', function () {
    return {
      templateUrl: 'scripts/directives/hierarchy/hierarchy.html',
      restrict: 'E',
      scope: {
      	list: '='
      },
      link: function(scope, el, attr){
      	scope.$watch('list', function(){
      		
      	});
      }
    };
  });
