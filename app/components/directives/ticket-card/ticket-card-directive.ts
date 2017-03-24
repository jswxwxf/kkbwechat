/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export var directiveName = 'ticketCard';

import controller = require('./ticket-card-controller');

class TicketCardDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    ticket: '='
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  template = "<ng-include src='ctrl.getUrl()'></ng-include>";

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(TicketCardDirective);
}];