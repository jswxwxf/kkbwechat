/// <reference path="../../../../lib/app.d.ts" />

import IPromise = angular.IPromise;
'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.car.SelectController';

class SelectController extends BaseController {

  car;

  static $inject = ['$scope', '$state', 'cars', 'car_id', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $scope, private $state, private cars, private car_id, private utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    this.cars = cars.data.data;
    this.loadCar();
  }

  loadCar() {
    this.car = _.find(this.cars, { car_id: this.car_id });
    //this.utilService.showSpinner();
    //return this.carService.getCar(this.car_id).success((data) => this.car = data.data).finally(() => this.utilService.hideSpinner());
  }

  carSelected() {
    //this.utilService.returnPrevious(null, { car_id: this.car.car_id, license_number: this.car.license_number }, { reload: true });
  }

}

export class Controller extends SelectController {}