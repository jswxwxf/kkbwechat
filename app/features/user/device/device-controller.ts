/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.device.DeviceController';

class DeviceController extends BaseController {

  car;
  device;

  static $inject = ['$q', '$scope', '$state', 'cars', common.utilService.serviceName, services.deviceService.serviceName, services.carService.serviceName];

  constructor(private $q, private $scope, private $state: angular.ui.IStateService, private cars, private utilService: common.utilService.Service, private deviceService: services.deviceService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    super.setModalSrc('sigintro', '/features/user/device/sigintro.html');
    this.cars = this.cars.data.data;
    this.loadDevice();
  }

  loadDevice(car?) {
    this.$q.when(car).then((car) => {
      this.utilService.showSpinner();
      if (car) return car;
      return this.carService.getActiveCarId().then((car_id) => {
        return _.find(this.cars, { car_id: car_id });
      });
    }).then((car: any) => {
      this.car = car;
      this.deviceService.getDevice(car.car_id).success((data) => {
        this.device = data.data;
      }).finally(() => this.utilService.hideSpinner());
    }).catch((err) => {
      console.log(err);
      this.utilService.hideSpinner();
    })
  }

}

export class Controller extends DeviceController {}