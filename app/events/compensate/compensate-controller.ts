/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {CompensateController} from "../../features/insurance/compensate/compensate-controller";

export var controllerName = 'insurance.compensate.CompensateController';

class EventCompensateController extends CompensateController {

  static $inject = ['$scope', '$state', 'total', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected total, protected utilService: common.utilService.Service, protected insuranceService: services.insuranceService.Service) {
    super($scope, $state, total, utilService, insuranceService);
    this.total = total.data;
  }

  onSuccess() {
    this.$state.go('compensate.success');
  }

}

export class Controller extends EventCompensateController {}