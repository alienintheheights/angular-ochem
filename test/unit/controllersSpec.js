'use strict';

/* jasmine specs for controllers go here */
describe('Card controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('ochemcards'));
  beforeEach(module('cardServices'));

  describe('CardListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('cards/cards.json').
          respond([{name: 'hydroboration'}, {name: 'halohydrination'}]);

      scope = $rootScope.$new();
      ctrl = $controller('CardListCtrl', {$scope: scope});
    }));


    it('should create "cards" model with 2 cards fetched from xhr', function() {
      expect(scope.cards).toEqualData([]);
      $httpBackend.flush();

      expect(scope.cards).toEqualData(
          [{name: 'hydroboration'}, {name: 'halohydrination'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('type');
    });
  });


});
