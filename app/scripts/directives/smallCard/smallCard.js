'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:smallCard
 * @description
 * # smallCard
 */
angular.module('angularApp')
  .directive('smallCard', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the smallCard directive');
      }
    };
  });
