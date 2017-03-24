/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";
import {PrizeHelper} from "../result/prize-helper";

export var controllerName = 'order.lcb.OrderController';

class OrderController extends BaseController {

  static $inject = ['$scope', '$state', 'order', common.utilService.serviceName, services.orderService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private order, private utilService: common.utilService.Service, private orderService: services.orderService.Service) {
    super($scope, utilService);
    super.setModalSrc('green-agreement', '/features/insurance/lcb/green-agreement.html');
    super.setModalSrc('hunt-agreement', '/features/insurance/lcb/hunt-agreement.html');
    super.setModalSrc('auto-agreement', '/features/share/register/agreements/auto.html');
    super.setModalSrc('hx-agreement', '/features/insurance/lcb/hx-agreement.html');
    this.order = order.data.data;
  }

  cancel() {
    this.utilService.showSpinner();
    this.orderService.cancelLcb15Order(this.order.order_id).then(resp => {
      this.utilService.alert(`您的退保申请已经收到，我们将尽快联系您，请保持手机畅通。`);
      this.$state.go('order.list');
    }).finally(() => this.utilService.hideSpinner());
  }

  getLcb15SubPrice() {
    return Utils.parseFloat(this.order.standard_commercial) + Utils.parseFloat(this.order.compulsory) + Utils.parseFloat(this.order.tax);
  }

  getLcb15DiscountPrice() {
    var price = this.getLcb15SubPrice();
    if (this.order.product_id == 1 /* 优选 */) {
      price -= Utils.parseFloat(this.order.rate_dis);
    }
    if (this.order.product_id == 4 /* 惠选 */) {
      price -= Utils.parseFloat(this.order.usable_credit);
      price -= Utils.parseFloat(this.order.prizes_remain);
    }
    return price;
  }

  getLcb15StatusText() {
    if (!this.order) return;
    var status = parseInt(this.order.status);
    if (status == 2) return `我们正在为您出单，请耐心等待`;
    if (status == 3) return `保险公司已经出单，将尽快为您配送保单`;
    if (status == 8) return `您的退保申请已经收到，我们将尽快联系您，请保持手机畅通。`;
  }

}

Utils.applyMixins(OrderController, [PrizeHelper]);

export class Controller extends OrderController {}
