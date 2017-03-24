/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.car.CarController';

class CarController extends BaseController {

  car;
  status;

  static $inject = ['$scope', '$state', '$timeout', 'car_id', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private $timeout, private car_id, private utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    if (!car_id) {
      this.utilService.handleNoCar();
      return;
    }
    this.loadCar().then(() => this.loadStatus());
  }

  loadCar(car?) {
    var car_id = car ? car.car_id : this.car_id;
    this.utilService.showSpinner();
    return this.carService.getCar(car_id).success((data) => this.car = data.data).finally(() => this.utilService.hideSpinner());
  }

  loadStatus() {

    if (this.$state.current.name != 'user.car.status') return;

    this.utilService.showSpinner();
    this.carService.getStatus(this.car.car_id).success((data) => {
      this.status = data.data;
    }).finally(() => this.utilService.hideSpinner());

  }

}

export class Controller extends CarController {}