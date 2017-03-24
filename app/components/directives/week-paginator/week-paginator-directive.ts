/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'weekPaginator';

import controller = require('./week-paginator-controller');

class WeekPaginatorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    name: '@',
    onWeek: '&'
  };

  templateUrl = 'components/directives/week-paginator/week-paginator.html';
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

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
  return $injector.instantiate(WeekPaginatorDirective);
}];