'use strict';

/* App Module */

angular.module('ochemcards', [
  'ochemcards.cards',
  'ochemcards.animations',
  'ochemcards.cards.service',
  'ochemcards.utils.service',
  'ui.router'
  ])

.run(
  ['$rootScope', '$state', '$stateParams',
  function ($rootScope,   $state,   $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

   }]
  )

.config(
  ['$stateProvider', '$urlRouterProvider',
  function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      
      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

      
        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/cards/:id')
        .when('/card/:id', '/cards/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/cards');


    }]
  );


