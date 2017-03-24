/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import {Utils} from "../../../utility/index";

export var directiveName = 'lcbScoreBar';

import controller = require('./score-bar-controller');

class ScoreBarDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    score: '=',
    label: '@',
    value: '=',
    colorClass: '=',
    vertical: '@'
  };
  replace = true;

  controller = controller.Controller;
  controllerAs = 'ctrl';

  templateUrl = (tEl, attrs) => {
    if (Utils.parseBool(attrs['vertical'])) {
      return 'components/directives/score-bar/score-bar-vertical.html'
    }
    return 'components/directives/score-bar/score-bar-horizontal.html';
  };

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    var ctrl = scope['ctrl'];
    scope.$watch('score', (val) => {
      ctrl.setScore(val);
    });
    scope.$watch('value', (val) => {
      ctrl.setValue(val);
    });
    scope.$watch('colorClass', (val) => {
      ctrl.setColorClass(val);
    })
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(ScoreBarDirective);
}];