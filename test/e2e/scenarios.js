'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Card App', function() {

  it('should redirect index.html to index.html#/cards', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/cards');
      });
  });


  describe('Card list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/cards');
    });


    it('should filter the card list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('card in cards'));
      var query = element(by.model('query'));

      expect(phoneList.count()).toBe(7);

      query.sendKeys('hydro');
      expect(phoneList.count()).toBe(3);

      query.clear();
      query.sendKeys('osm');
      expect(phoneList.count()).toBe(1);
    });


    it('should be possible to control card order via the drop down select box', function() {

      var cardNameColumn = element.all(by.repeater('card in cards').column('card.name'));
      var query = element(by.model('query'));

      function getNames() {
        return cardNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('halo'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Halohydrogenation",
        "Halogenation"
      ]);

     
    });


  });



});
