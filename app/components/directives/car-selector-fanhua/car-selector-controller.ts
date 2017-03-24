/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class CarSelectorController extends BaseController {

  initVal;

  carInfo: any = {};
  result;
  selectedCar;

  static $inject = ['$scope', '$timeout', common.utilService.serviceName, services.fanhuaService.serviceName];

  constructor(public $scope, private $timeout, private utilService: common.utilService.Service, private fanhuaService: services.fanhuaService.Service) {
    super($scope, utilService);
    super.setModalSrc('car-selector', '/components/directives/car-selector-fanhua/car-selector.html');
    $scope.$watch(() => this.selectedCar, this.carSelected.bind(this));
    $scope.$watch(() => this.initVal, this.initValChanged.bind(this));
  }

  initValChanged(newVal, oldVal) {
    if (newVal == oldVal) return;
    if (!this.carInfo.vehicleName) this.carInfo.vehicleName = newVal;
  }

  searchCar() {
    this.utilService.showSpinner();
    this.fanhuaService.searchCar(this.carInfo).then(resp => {
      this.result = resp.data;
    }).finally(() => this.utilService.hideSpinner());
  }

  carSelected(newVal, oldVal) {
    if (!newVal) return;
    this.hideModal('car-selector');
  }

}

export class Controller extends CarSelectorController {}