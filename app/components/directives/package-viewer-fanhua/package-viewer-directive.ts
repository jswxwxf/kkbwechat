/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export let directiveName = 'packageViewerFanhua';

import controller = require('./package-viewer-controller');

class PackageViewerDirective implements angular.IDirective {

  restrict = 'E';
  scope = {};
  replace = true;

  //require = 'ngModel';
  controller = controller.Controller;
  controllerAs = 'ctrl';
  bindToController = {
    package: '='
  };

  templateUrl = 'components/directives/package-viewer-fanhua/package-viewer.html';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, modelCtrl) {

    function cover(val) {
      if (val == 'false' || val === false) return false;
      if (val === '') return false;
      if (val == 0) return false;
      if (val == undefined) return false;
      return true;
    }

    scope['show'] = function(val) {
      return cover(val);
    };

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(PackageViewerDirective);
}];