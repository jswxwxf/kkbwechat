/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export var directiveName = 'shopCard';

import controller = require('./shop-card-controller');

class ShopCardDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    card: '=',
    bean: '=',
    onExchange: '&'
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  template = "<ng-include src='ctrl.getUrl()'></ng-include>";

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(ShopCardDirective);
}];