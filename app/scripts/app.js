'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    // 'ngAnimate',
    'ui.router',
    'ngFx'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/taxonomy/0');

    $stateProvider
      .state('taxonomy', {
        url: '/taxonomy/:tsn',
        templateUrl: 'views/taxonomy.html',
        controller: 'TaxonomyCtrl'
      });
  });
