/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.car.EditController';

class EditController extends BaseController {

  car;
  brands;
  oils;

  editing: boolean = false;

  pageTitle;

  static $inject = ['$scope', '$state', 'data', 'car_id', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $scope, private $state, private data, private car_id, private utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    this.brands = data.brands.data.data;
    this.oils = data.oils;
    this.pageTitle = '车辆添加';
    if (car_id) {
      this.pageTitle = '车辆编辑';
      this.editing = true;
      this.loadCar();
    }
  }

  loadCar() {
    this.utilService.showSpinner();
    this.carService.getCar(this.car_id).success((data) => {
      this.car = data.data;
      this.car['car'] = models.car.Model.fromCar(this.car);
    }).finally(() => this.utilService.hideSpinner());
  }

  saveCar() {
    this.utilService.showSpinner();
    var car = models.car.Model.fromVO(this.car);
    var promise = null;
    if (car.car_id) {
      promise = this.carService.updateCar(car)
    } else {
      promise = this.carService.addCar(car)
    }
    promise.success((data) => {
      var car_id = data.car_id || car.car_id;
      this.carService.setActiveCarId(car_id);
      this.utilService.returnBack('user.car', { car_id: car_id }, { reload: true });
      //this.$state.go('user.car', { car_id: car_id }, { reload: true })
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends EditController {}