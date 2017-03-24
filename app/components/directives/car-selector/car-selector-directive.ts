/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'carSelector';

import controller = require('./car-selector-controller');

class CarSelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    brands: '=',
    model: '=ngModel',
    labelPrefix: '@',
    disabled: '=',
    required: '='
  };

  templateUrl = 'components/directives/car-selector/car-selector.html';
  replace = true;

  require = ['ngModel', 'carSelector'];
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

    ctrl.car = scope['model'];

    modelCtrl.$render = function () {
      ctrl.car = modelCtrl.$viewValue || {};
    }

    var watchFn = (val) => {
      modelCtrl.$setViewValue(ctrl.car);
      if (scope['required']) {
        modelCtrl.$setValidity('required', !_.isEmpty(ctrl.car.model));
      }
    };

    scope.$watchCollection('ctrl.car', watchFn);
    scope.$watch('ctrl.car', watchFn);

    scope.$watch('disabled', (val) => {
      ctrl.disabled = val;
    });

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CarSelectorDirective);
}];