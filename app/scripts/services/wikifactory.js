/**
 * @ngdoc service
 * @name angularApp.wikiFactory
 * @description
 * # wikiFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('wikiFactory', function($http) {
    'use strict';
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&callback=JSON_CALLBACK";

    var buildQuery = function(obj) {
      var url = wikiUrl;
      for (var key in obj) {
        url += '&' + key + '=' + obj[key];
      }
      return url;
    };

    function parseData(data, target) {
      for (var prop in data.query.pages) {
        if (data.query.pages[prop][target] !== undefined) {
          return data.query.pages[prop];
        }
      }
      return undefined;
    }

    var getWiki = function(title) {
      var url = buildQuery({
        titles: title,
        prop: "pageimages|extracts",
        pithumbsize: 500,
        redirects: true,
        exintro: true,
        explaintext: true,
      });

      return $http({
        url: url,
        method: 'jsonp'
      }).then(function(results) {
        return parseData(results.data, 'extract');
      });
    };

    return {
      getWiki: getWiki
    };
  });
