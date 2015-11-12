'use strict';

describe('Service: wikiFactory', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var wikiFactory;
  beforeEach(inject(function (_wikiFactory_) {
    wikiFactory = _wikiFactory_;
  }));

  it('should do something', function () {
    expect(!!wikiFactory).toBe(true);
  });

});
