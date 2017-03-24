/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.device.BindDeviceController';

class BindDeviceController extends BaseController {

  device;

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.deviceService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private utilService: common.utilService.Service, private deviceService: services.deviceService.Service) {
    super($scope, utilService);
  }

  bindDevice() {
    this.utilService.showSpinner();
    this.device.code = _.padLeft(this.device.code, 4, '0');
    this.deviceService.bindDevice(this.device).success((data) => this.$state.go('user.device.bind.car', { device_id: data.data.device_id })).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends BindDeviceController {}