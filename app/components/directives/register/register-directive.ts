/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'lcbRegister';

import controller = require('./register-controller');

class RegisterDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    product: '@',      // green 平安, auto 凹凸, hunt 优选车险
    onSuccess: '&',
    onFailure: '&'
  };

  templateUrl = 'components/directives/register/register.html';
  replace = true;
  transclude = true;

  //require = 'ngModel';
  controller = controller.Controller;
  controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, modelCtrl) {}

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(RegisterDirective);
}];