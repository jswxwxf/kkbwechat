/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'dvr.CarInfoController';

export class CarInfoController extends BaseController {

  vehicle;

  static $inject = ['$scope', '$state', '$location', 'activeCar', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $state, private $location, private activeCar, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    this.activeCar = activeCar.data.data;
  }

  save() {
    var payload = angular.copy(this.vehicle);
    payload.registered_on = Utils.formatDate(this.vehicle.registered_on);
    this.utilService.showSpinner();
    this.dvrService.doTaskVehicle(payload, this.$location.search()).then(data => {
      this.utilService.alert(data.data.msg).then(data => {
        this.$state.go('dvr2.earning');
      });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends CarInfoController {}