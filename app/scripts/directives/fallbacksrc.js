/**
 * @ngdoc directive
 * @name angularApp.directive:fallbackSrc
 * @description
 * # fallbackSrc
 */
angular.module('angularApp')
  .directive('fallbackSrc', function() {
    'use strict';
    var fallbackSrc = {
      link: function postLink(scope, el, attrs) {
        if (attrs.ngSrc === '') {
          el.attr('src', attrs.fallbackSrc || 'images/tree.png');
        }
      }
    };
    return fallbackSrc;
  });
