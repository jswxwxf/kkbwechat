/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

class ScoreBarController extends BaseController {

  score;
  label;
  value;
  colorClass;
  vertical;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.label = $scope['label'];
    this.vertical = Utils.parseBool($scope['vertical']);
  }

  setScore(score) {
    this.score = score || 0;
  }

  setValue(value) {
    this.value = value || 0;
  }

  setColorClass(value) {
    this.colorClass = value || 'lcb-default-color';
  }

}

export class Controller extends ScoreBarController {}