/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export var directiveName = 'inquiryCard';

import controller = require('./inquiry-card-controller');

class InquiryCardDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    inquiry: '='
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  templateUrl = 'components/directives/inquiry-card/inquiry-card.html';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(InquiryCardDirective);
}];