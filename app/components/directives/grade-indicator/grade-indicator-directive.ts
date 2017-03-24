/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import models = require('../../models/index');

import controller = require('./grade-indicator-controller');

export var directiveName = 'gradeIndicator';

class GradeIndicatorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    grade: '='
  };

  templateUrl = 'components/directives/grade-indicator/grade-indicator.html';
  replace = true;

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

    //var render = (value) => {
    //  if (!value) return;
    //  el.removeClass('lcb-step1-on lcb-step2-on lcb-step3-on');
    //  for (var i = 1; i <= value; i++) {
    //    var clz = ['lcb-step', i, '-on'].join('');
    //    el.addClass(clz);
    //  }
    //};
    //
    //scope.$watch('stepIndex', render);

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(GradeIndicatorDirective);
}];