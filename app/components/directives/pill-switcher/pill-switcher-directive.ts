/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import {Utils} from "../../../utility/index";

export var directiveName = 'lcbPillSwitcher';

import controller = require('./pill-switcher-controller');

class PillSwitcherDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = {
    options: '=',
    onSwitch: '&'
  };

  templateUrl = 'components/directives/pill-switcher/pill-switcher.html';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(PillSwitcherDirective);
}];