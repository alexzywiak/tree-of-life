'use strict';

/**
 * @ngdoc service
 * @name angularApp.wikiFactory
 * @description
 * # wikiFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('wikiFactory', function($http) {

    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK";

    var getExtract = function(title) {

    };

    var getImage = function(title) {
      $http({
        url: wikiUrl,
        method: 'JSONP',
        params: {
          titles: title,
          prop: "pageimages",
          pithumbsize: 150,
          redirects: true
        }
      }).then(function(results) {
        console.log(results);
      });
    };

    return {
      getExtract: getExtract,
      getImage: getImage
    }
  });
