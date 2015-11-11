'use strict';

describe('Controller: TaxonomyCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var TaxonomyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaxonomyCtrl = $controller('TaxonomyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
