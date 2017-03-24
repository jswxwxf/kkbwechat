/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

var emptyCb = function() {};

class CarSwitcherController extends BaseController {

  cars;
  car;
  label;
  onChange;
  type;
  setActive;
  canAdd;

  static $inject = ['$q', '$scope', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $q, public $scope, private utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($scope, utilService);
    super.setModalSrc('cars', '/components/directives/car-switcher/cars.html');
    this.cars = $scope['cars'];
    this.onChange = $scope['onChange'] || emptyCb;
    this.label = $scope['label'];
    this.type = $scope['type'] || 'list-icon';
    this.setActive = Utils.parseBool($scope['setActive'], true);
    this.canAdd = Utils.parseBool($scope['canAdd'], true);
  }

  loadCars() {
    this.utilService.showSpinner();
    return this.carService.getCars().success((data) => this.cars = data.data).finally(() => this.utilService.hideSpinner());
  }

  setCar(car) {
    this.car = car;
    this.$q.when(this.setActive).then((setActive) => {
      if (!setActive) return true;
      this.utilService.showSpinner();
      this.carService.setActiveCarId(car.car_id).then(() => true).finally(() => this.utilService.hideSpinner());
    }).then(() => {
      this.onChange({ car: car });
    })
  }

  showCarsModal() {
    if (this.cars) {
      return this.showModal('cars');
    }
    this.loadCars().then(() => this.showModal('cars'));
  }

}

export class Controller extends CarSwitcherController {}