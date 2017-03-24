/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'couponSelector';

import controller = require('./coupon-selector-controller');

class CouponSelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
  };

  templateUrl = 'components/directives/coupon-selector/coupon-selector.html';

  replace = true;

  require = ['ngModel', 'couponSelector'];
  controller = controller.Controller;
  controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, ctrls) => {
    var modelCtrl = ctrls[0];
    var ctrl = ctrls[1];
    scope.$watch(() => ctrl.coupon, (newValue) => modelCtrl.$setViewValue(newValue));
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CouponSelectorDirective);
}];