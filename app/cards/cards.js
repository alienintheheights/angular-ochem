angular.module('ochemcards.cards', [
  'ui.router'
  ])

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider,   $urlRouterProvider) {

    $stateProvider

        /////////////////////
        // CARDS //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'cards' state.
        .state("cards", {

          // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of its children.
          abstract: true,


          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/cards' (because '/cards' + '').
          url: "/cards",

          templateUrl: 'app/cards/cards.html',

          // Use `resolve` to resolve any asynchronous controller dependencies
          // *before* the controller is instantiated. In this case, since cards
          // returns a promise, the controller will wait until cards.all() is
          // resolved before instantiation. Non-promise return values are considered
          // to be resolved immediately.

          resolve: {
            cards: ['cards',
            function( cards){
              return cards.all();
            }]
          },

          controller: ['$scope', '$state', 'cards', 'utils',
          function($scope,  $state, cards, utils) {
            $scope.cards = cards;
            $scope.orderProp = 'type';
            // score card
            $scope.correctAnswers = [];
            $scope.successMsg = '';
          
            // called whenever an answer is marked known
            $scope.updateScore = function(cardId) {
              $scope.correctAnswers.push(cardId);
            }

            // fetches current right answer count
            $scope.getScore = function() {
              return $scope.correctAnswers.length;
            }

            // checks to see if the card has been marked as known
            $scope.isKnown = function(cardId) {
              return $.inArray(cardId, $scope.correctAnswers) !== -1;
            }

            // checks to see if the card has been marked as known
            $scope.isDisabled = function(cardId) {
              return $scope.isKnown(cardId);
            }

            // random card picker
            $scope.getRandomCard = function(reset) {
              // if reset param set, flush score card
              if (reset) {
                $scope.correctAnswers = [];
                $scope.successMsg = '';
              }
              // filter out their known answers
              var remainingChoices = $scope.cards.filter(function(x) { 
                return $scope.correctAnswers.indexOf(x.id) < 0; 
              });
              // get random Id
              var randId = utils.newRandomKey(remainingChoices, "id", $state.params.cardId);
              if (!randId) {
                $scope.successMsg = "Congrats, you learned them all! Rinse.Lather.Repeat.";
                $state.go('cards.list', {});
              } else {
                // redirect to controller
                $state.go('cards.detail', { cardId: randId });
              }
            };

            // image setter
            $scope.getImage = function(cardId) {
              $scope.imageUrl = "/img/cards/" + cardId + ".png";
            };
          }]
        })

         //////////////
        // Game //
        //////////////
        .state("cards.list", {

          
          // This abstract state will prepend '/cards' onto the urls of all its children.
          url: "",

          templateProvider: ['$state', 
                function ($state) {
                  // This is just to demonstrate that $stateParams injection works for templateProvider.
                  // $stateParams are the parameters for the new state we're transitioning to, even
                  // though the global '$stateParams' has not been updated yet.
                  return '<button class="btn btn-primary" ng-click="getRandomCard(true)">Start game</button>' +
                      '<div class="alert alert-info slide" ng-show="successMsg">{{successMsg}}</div>';
          }]
          
        })

         // You can have unlimited children within a state. Here is a second child
        // state within the 'cards' parent state.
        .state('cards.detail', {

          // Urls can have parameters. They can be specified like :param or {param}.
          // If {} is used, then you can also specify a regex pattern that the param
          // must match. The regex is written after a colon (:). Note: Don't use capture
          // groups in your regex patterns, because the whole regex is wrapped again
          // behind the scenes. Our pattern below will only match numbers with a length
          // between 1 and 4.

          // Since this state is also a child of 'cards' its url is appended as well.
          // So its url will end up being '/cards/{cardId:[0-9]{1,4}}'. When the
          // url becomes something like '/cards/42' then this state becomes active
          // and the $stateParams object becomes { cardId: 42 }.
          url: '/{cardId:[0-9]{1,4}}',

          // If there is more than a single ui-view in the parent template, or you would
          // like to target a ui-view from even higher up the state tree, you can use the
          // views object to configure multiple views. Each view can get its own template,
          // controller, and resolve data.

          // View names can be relative or absolute. Relative view names do not use an '@'
          // symbol. They always refer to views within this state's parent template.
          // Absolute view names use a '@' symbol to distinguish the view and the state.
          // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
          views: {

            // So this one is targeting the unnamed view within the parent state's template.
            '': {
              templateUrl: 'app/cards/cards.detail.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.card = utils.findById($scope.cards, $stateParams.cardId);
                }]
            },

            // This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
            // This shows off how you could populate *any* view within *any* ancestor state.
            'hint@': {
              template: 'This is cards.detail populating the "hint" ui-view'
            },

            // This one is targeting the ui-view="menuTip" within the parent state's template.
            'menuTip': {
              // templateProvider is the final method for supplying a template.
              // There is: template, templateUrl, and templateProvider.
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  // This is just to demonstrate that $stateParams injection works for templateProvider.
                  // $stateParams are the parameters for the new state we're transitioning to, even
                  // though the global '$stateParams' has not been updated yet.
                  return '<hr><small class="muted">card ID: ' + $stateParams.cardId + '</small>';
                }]
            }
          }
        })

      }]);