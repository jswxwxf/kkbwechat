/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import {Utils} from "../../../utility/index";

export var directiveName = 'lcbProgressBar';

import controller = require('./progress-bar-controller');

class ProgressBarDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    value: '=',
    max: '=',
    colorClass: '='
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  templateUrl = 'components/directives/progress-bar/progress-bar.html';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    var ctrl = scope['ctrl'];
    scope.$watch('value', (val) => {
      ctrl.setValue(val);
    });
    scope.$watch('max', (val) => {
      ctrl.setMax(val);
    });
    scope.$watch('colorClass', (val) => {
      ctrl.setColorClass(val);
    })
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(ProgressBarDirective);
}];