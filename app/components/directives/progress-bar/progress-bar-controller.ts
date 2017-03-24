/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

class ProgressBarController extends BaseController {

  max;
  value;
  colorClass;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.max = $scope['max'];
    this.value = $scope['value'];
    this.colorClass = Utils.parseBool($scope['colorClass']);
  }

  setValue(value) {
    this.value = value || 0;
  }

  setMax(value) {
    this.max = value || 0;
  }

  setColorClass(value) {
    this.colorClass = value || 'lcb-default-color';
  }

  getProgress() {
    return parseInt(this.value) / parseInt(this.max) * 100;
  }

}

export class Controller extends ProgressBarController {}