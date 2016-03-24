angular.module('ochemcards.cards.service', [

])


// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('cards', ['$http', 'utils', function ($http, utils) {
  var path = 'app/assets/cards.json';
  var cards = $http.get(path).then(function (resp) {
    return resp.data.cards;
  });

  var factory = {};
  factory.all = function () {
    return cards;
  };
  factory.get = function (id) {
    return cards.then(function(){
      return utils.findById(cards, id);
    })
  };
  return factory;
}]);