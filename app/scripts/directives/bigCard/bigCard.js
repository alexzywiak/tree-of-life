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
      },
      controller: 'CardCtrl',
      link: function(scope, el, attr){
      	scope.$watch('taxon', function(){
      		scope.getWiki(scope.taxon.complete_name)
      			.then(function(result){
      				scope.taxon.wiki = result;
      			});
      	});
      }
    };
  });
