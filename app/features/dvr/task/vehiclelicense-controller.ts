/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'dvr.VehicleLicenseController';

export class VehicleLicenseController extends BaseController {

  license;

  static $inject = ['$scope', '$state', '$location', 'activeCar', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $state, private $location, private activeCar, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    this.activeCar = activeCar.data.data;
  }

  save() {
    var payload: any = {};
    if (this.license.front) payload.license_vehicle = { data: this.license.front.base64, filename: this.license.front.filename };
    if (this.license.back) payload.license_vehicle_back = { data: this.license.back.base64, filename: this.license.back.filename };
    this.utilService.showSpinner();
    this.dvrService.doTaskVehicleLicense(payload, this.$location.search()).then(data => {
      this.utilService.alert(data.data.msg).then(data => {
        this.$state.go('dvr2.earning');
      });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends VehicleLicenseController {}