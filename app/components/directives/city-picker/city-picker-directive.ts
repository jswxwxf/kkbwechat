/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'lcbCityPicker';

import controller = require('./city-picker-controller');
import {Utils} from "../../../utility/index";

class MultiPickerDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};

  template = `
    <a href="javascript:void(0)" class="lcb-city-picker item item-icon-right">
      <ng-transclude></ng-transclude>
      <span class=item-note>{{ctrl.getDisplayText()}}</span>
      <i class="icon ion-chevron-right lcb-normal-font"></i>
    </a>
  `;

  replace = true;
  transclude = true;

  require = ['ngModel', 'lcbCityPicker'];
  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = true;

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

    el.click(() => ctrl.showPicker());

    // add validation
    modelCtrl.$parsers.push(function(viewValue) {
      modelCtrl.$setValidity('required', !Utils.isEmpty(viewValue));
      return viewValue;
    });

    modelCtrl.$render = function () {
      if (modelCtrl.$viewValue == null) {
        // setTimeout(() => unselectAll(), 0);
        return modelCtrl.$setViewValue(null);
      }
    };

    scope.$watch(() => ctrl.selectedCity, (newValue) => modelCtrl.$setViewValue(newValue));

    // 暂时不支持值回转
    modelCtrl.$setViewValue(null);

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(MultiPickerDirective);
}];