/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'lcbDayPaginator';

import controller = require('./day-paginator-controller');

class DayPaginatorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};

  templateUrl = 'components/directives/day-paginator/day-paginator.html';
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = {
    onDay: '&'
  };

  //static $inject = [ bbLocalizeService.serviceName, '$timeout' ];
  //
  //constructor(
  //  private bbLocalize: bbLocalizeService.Service,
  //  private $timeout: any
  //) {}

  link(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) {
    if (attrs.name) {
      _.set(scope.$parent, attrs.name, new controller.ExposedController(scope['ctrl']));
    }
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(DayPaginatorDirective);
}];