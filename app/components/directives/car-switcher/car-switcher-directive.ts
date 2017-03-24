/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'carSwitcher';

import controller = require('./car-switcher-controller');

class CarSwitcherDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    cars: '=',
    label: '@',
    value: '=',
    onChange: '&',
    type: '@',    // list-item, list-icon, button, button-icon. default: list-icon
    setActive: '@',  // default: true
    canAdd: '@'  // default: true
  };

  templateUrl = (el, attrs) => {
    var type = attrs['type'] || 'list-icon';
    return 'components/directives/car-switcher/car-switcher-' + type + '.html';
  };

  replace = true;

  //require = ['ngModel', 'carSelector'];
  controller = controller.Controller;
  controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    var ctrl = scope['ctrl'];
    scope.$watch('value', (newVal, oldVal) => {
      if (angular.isUndefined(newVal)) return;
      //if (_.isEqual(newVal, oldVal)) return;
      ctrl.car = newVal;
    })
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CarSwitcherDirective);
}];