'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:bigCard
 * @description
 * # bigCard
 */
angular.module('angularApp')
  .directive('bigCard', function () {
    return {
      templateUrl: 'scripts/directives/bigCard/bigCard.html',
      restrict: 'E',
      scope: {
      	taxon: "="
      }
    };
  });
