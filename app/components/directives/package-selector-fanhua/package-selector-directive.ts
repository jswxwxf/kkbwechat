/// <reference path="../../../../lib/app.d.ts" />

'use strict';

export let directiveName = 'packageSelectorFanhua';

import controller = require('./package-selector-controller');

class PackageSelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    //onPage: '=onPage'
  };

  templateUrl = 'components/directives/package-selector-fanhua/package-selector.html';
  replace = true;

  require = ['ngModel', 'packageSelectorFanhua'];
  controller = controller.Controller;
  controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, ctrls) {

    var modelCtrl = ctrls[0];
    var ctrl = ctrls[1];

    modelCtrl.$render = function () {
      ctrl.setInsureInfo(modelCtrl.$viewValue);
    };

    scope.$watch('ctrl.insureInfo', (val) => {
      modelCtrl.$setViewValue(ctrl.insureInfo);
    }, true);
  }

}

export let Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(PackageSelectorDirective);
}];