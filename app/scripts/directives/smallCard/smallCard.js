'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:smallCard
 * @description
 * # smallCard
 */
angular.module('angularApp')
  .directive('smallCard', function() {
    return {
      templateUrl: 'scripts/directives/smallCard/smallCard.html',
      restrict: 'E',
      scope: {
        taxon: '='
      },
      controller: 'CardCtrl',
      link: function(scope, el, attrs) {
        scope.$watch('taxon', function(n, o) {
          if (scope.taxon && scope.taxon.complete_name) {
            scope.getWiki(scope.taxon.complete_name)
              .then(function(results) {
                scope.taxon.wiki = results;
              });
          }
        });
      }
    }
  });
