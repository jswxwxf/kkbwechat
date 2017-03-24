/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'insurance.compensate.CompensateController';

export class CompensateController extends BaseController {

  private compensate;

  static $inject = ['$scope', '$state', 'total', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected total, protected utilService: common.utilService.Service, protected insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    super.setModalSrc('intro', '/features/insurance/compensate/intro.html');
    this.total = total.data;
  }

  sendCompensateCode() {
    this.insuranceService.sendCompensateCode(this.compensate.mobile);
  }

  applyCompensate() {
    this.utilService.showSpinner();
    this.insuranceService.applyCompensate(this.compensate).success((data) => this.onSuccess()).finally(() => this.utilService.hideSpinner());
  }

  onSuccess() {
    this.$state.go('order.compensate');
  }

}

export class Controller extends CompensateController {}