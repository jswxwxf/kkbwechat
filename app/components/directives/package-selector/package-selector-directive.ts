/// <reference path="../../../../lib/app.d.ts" />

'use strict';

export var directiveName = 'packageSelector';

import controller = require('./package-selector-controller');
import models = require('../../models/index');

class PackageSelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    //onPage: '=onPage'
  };

  templateUrl = 'components/directives/package-selector/custom.html';
  replace = true;

  require = 'ngModel';
  controller = controller.Controller;
  controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, modelCtrl) {

    var ctrl = scope['ctrl'];

    modelCtrl.$render = function () {
      ctrl.setPackage(modelCtrl.$viewValue);
    }

    scope.$watchCollection('ctrl.pkg', (val: models.pkg.Model) => {
      modelCtrl.$setViewValue(ctrl.pkg);
      // add validation
      modelCtrl.$setValidity('valid', models.pkg.Model.isValid(val));
    });
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(PackageSelectorDirective);
}];