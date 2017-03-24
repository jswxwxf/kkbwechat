/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import {Utils} from "../../../utility/index";

export var directiveName = 'lcbSlideSwitcher';

// import controller = require('./pill-switcher-controller');

class SlideSwitcherDirective implements angular.IDirective {

  restrict = 'A';
  scope = {
    'currentSlide': '=lcbSlideSwitcher',
    'onSwitch': '&'
  };
  replace = true;
  transclude = true;

  template = '<div ng-transclude></div>';

  // controller = controller.Controller;
  // controllerAs = 'ctrl';

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {

    var allSwitchers = el.find('.lcb-switcher');
    var self = this;

    allSwitchers.click(function() {
      allSwitchers.removeClass('lcb-on');
      $(this).addClass('lcb-on');
      scope['onSwitch']({ slide: parseInt($(this).text()) - 1 });
    });

    scope.$watch('currentSlide', (newValue: any, oldValue) => {
      newValue = newValue || 0;
      allSwitchers.removeClass('lcb-on');
      allSwitchers.eq(newValue).addClass('lcb-on');
    })

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(SlideSwitcherDirective);
}];