'use strict';

describe('Directive: smallCard', function () {

  // load the directive's module
  beforeEach(module('angularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<small-card></small-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the smallCard directive');
  }));
});
