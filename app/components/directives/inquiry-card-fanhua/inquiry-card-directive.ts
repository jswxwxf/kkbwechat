/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export let directiveName = 'inquiryCardFanhua';

import controller = require('./inquiry-card-controller');

class InquiryCardDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = {
    inquiry: '='
  };

  templateUrl = 'components/directives/inquiry-card-fanhua/inquiry-card.html';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

}

export let Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(InquiryCardDirective);
}];