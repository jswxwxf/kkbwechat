/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'carSelectorFanhua';

import controller = require('./car-selector-controller');
import {Utils} from "../../../utility/index";

class CarSelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};

  template = `
    <a href="javascript:void(0)" ng-click="ctrl.showModal('car-selector')" class="lcb-city-picker-fanhua item item-icon-right">
      <ng-transclude></ng-transclude>
      <span class=item-note>{{ctrl.selectedCar ? ctrl.selectedCar.vehicleName : '请选择车型'}}</span>
      <i class="icon ion-chevron-right lcb-normal-font"></i>
    </a>
  `;

  replace = true;
  transclude = true;

  require = ['ngModel', 'carSelectorFanhua'];
  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = {
    initVal: '=lcbInitialValue'
  };

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

    // // add validation
    // modelCtrl.$parsers.push(function(viewValue) {
    //   // modelCtrl.$setValidity('required', !Utils.isEmpty(viewValue));
    //   return viewValue;
    // });
    //
    // modelCtrl.$render = function () {
    //   // if (modelCtrl.$viewValue == null) {
    //   //   return modelCtrl.$setViewValue(null);
    //   // }
    //   modelCtrl.$setViewValue(ctrl.selectedCar);
    // };

    scope.$watch(() => ctrl.selectedCar, (newValue) => modelCtrl.$setViewValue(newValue));

    // 暂时不支持值回转
    // modelCtrl.$setViewValue(null);

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CarSelectorDirective);
}];