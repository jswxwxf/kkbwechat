/// <reference path="../../../../lib/app.d.ts" />

import IPromise = angular.IPromise;
'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.car.SafetyController';

class SafetyController extends BaseController {

  car_id;

  static $inject = ['$scope', 'safety', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $scope, private safety, private utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    this.car_id = safety.data.car_id;
    this.safety = safety.data.data;
  }

  save() {
    this.utilService.showSpinner();
    this.carService.setCarSafety(this.car_id, this.safety).success(() => this.utilService.alert('设置成功')).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends SafetyController {}