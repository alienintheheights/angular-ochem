'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('ochemcards'));

  // Test service availability
  it('check the existence of Card factory', inject(function(Card) {
      expect(Card).toBeDefined();
    }));
});