/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export var directiveName = 'orderCard';

import controller = require('./order-card-controller');

class OrderCardDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    order: '=',
    claim: '='
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  templateUrl = 'components/directives/order-card/order-card.html';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(OrderCardDirective);
}];