/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.device.BindCarController';

class BindCarController extends BaseController {

  car: any = {};
  device_id;
  license_vehicle;

  static $inject = ['$scope', '$state', '$stateParams', 'cars', common.utilService.serviceName, services.deviceService.serviceName, services.carService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, $stateParams, private cars, private utilService: common.utilService.Service, private deviceService: services.deviceService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    this.cars = cars.data.data;
    this.device_id = $stateParams['device_id'];
    setTimeout(() => this.loadCar(), 0);
  }

  loadCar() {
    this.utilService.showSpinner();
    this.carService.getActiveCar().then((car) => {
      this.car = car.data.data;
      this.selectCar(this.car);
    }).finally(() => this.utilService.hideSpinner());
  }

  selectCar(car) {
    this.utilService.showSpinner();
    this.carService.getCar(car.car_id).success((data) => {
      this.car = data.data;
      this.car['car'] = models.car.Model.fromCar(this.car);
      this.license_vehicle = this.car.license_vehicle;
    }).finally(() => this.utilService.hideSpinner());
  }

  updateLicense(fileObject) {
    var _self = this['ctrl'] || this;
    _self.utilService.showSpinner();
    _self.car.license_vehicle = { data: fileObject.base64, filename: fileObject.filename };
    _self.license_vehicle = ['data:', fileObject.filetype, ';base64,', fileObject.base64].join('');
    _self.carService.updateCar(_self.car).finally(() => _self.utilService.hideSpinner());
  }

  bindCar() {
    if (!_.startsWith(this.car.license_no, '沪') && _.isEmpty(this.car.license_vehicle)) {
      this.utilService.alert('激活设备前，需上传行驶证照片');
      return;
    }
    this.utilService.showSpinner();
    this.deviceService.bindCar(this.car, { device_id: this.device_id, model_id: this.car['car'].model.model_id }).success(() => {
      this.$state.go('user.device.bind.result');
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends BindCarController {}