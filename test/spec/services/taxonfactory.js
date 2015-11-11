'use strict';

describe('Service: taxonFactory', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var taxonFactory;
  beforeEach(inject(function (_taxonFactory_) {
    taxonFactory = _taxonFactory_;
  }));

  it('should do something', function () {
    expect(!!taxonFactory).toBe(true);
  });

});
