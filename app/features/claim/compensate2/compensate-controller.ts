/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'claim.compensate2.CompensateController';

export class CompensateController extends BaseController {

  orderState = 'order.compensate2';

  claim;

  static $inject = ['$scope', '$state', 'compensate', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected compensate, protected utilService: common.utilService.Service, protected insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.compensate = compensate.data.data.order;
  }


  makeClaim() {
    this.utilService.showSpinner();
    var payload = angular.copy(this.claim);
    payload.evidence = Utils.toImageData(this.claim.evidence);
    payload.invoice = Utils.toImageData(this.claim.invoice);
    payload.screenshot = Utils.toImageData(this.claim.screenshot);
    this.insuranceService.claimCompensate2(this.compensate.order_id, payload).then((data) => {
      this.utilService.alert('申请提交成功').then(() => this.$state.go(this.orderState, { order_id: this.compensate.order_id }));
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends CompensateController {}