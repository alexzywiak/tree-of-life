'use strict';

describe('Controller: CardctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CardctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CardctrlCtrl = $controller('CardctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
