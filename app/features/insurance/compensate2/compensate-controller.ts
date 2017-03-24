/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'insurance.compensate2.CompensateController';

export class CompensateController extends BaseController {

  orderState = 'order.compensate2';

  compensate: any = {
    platform: 1,
    pay_type: 4
  };

  price = 0;

  static $inject = ['$scope', '$state', 'products', common.utilService.serviceName, services.insuranceService.serviceName, services.paymentService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected products, protected utilService: common.utilService.Service, protected insuranceService: services.insuranceService.Service, protected paymentService: services.paymentService.Service) {
    super($scope, utilService);
    super.setModalSrc('compensate2-rule', '/features/insurance/compensate2/rule.html');
    this.products = products.data.data;
    this.watchPlatformAccount();
    this.watchModel();
    this.watchPackage();
  }

  watchPlatformAccount() {
    this.$scope.$watch(() => this.compensate.mobile, (newValue) => {
      if (this.compensate.platform_account) return;
      this.compensate.platform_account = newValue;
    });
  }

  watchModel() {
    this.$scope.$watch(() => this.compensate.model, (newValue) => {
      if (!newValue) return;
      this.compensate.package = this.products.models[newValue].high_risk ? 'high_risk': 'low_risk'
    });
  }

  watchPackage() {
    this.$scope.$watch(() => this.compensate.package, (newValue) => {
      if (!newValue) return this.price = 0;
      this.price = this.products.packages[newValue].price;
    });
  }

  sendCompensateCode() {
    this.insuranceService.sendCompensate2Code(this.compensate.mobile);
  }

  pay() {
    this.utilService.showSpinner();
    var payload = angular.copy(this.compensate);
    if (payload.platform_screenshot) payload.platform_screenshot = Utils.toImageData(payload.platform_screenshot);
    this.paymentService.payCompensate2Order(payload).then((data: any) => {
      this.$state.go(this.orderState, { order_id: data.order_id });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends CompensateController {}