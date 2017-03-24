/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'order.payment.BuyController';

class BuyController extends BaseController {

  payment;
  id_card: any = {};
  coupon;

  static $inject = ['$scope', '$state', '$stateParams', 'inquiry', common.utilService.serviceName, services.paymentService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private inquiry, private utilService: common.utilService.Service, private paymentService: services.paymentService.Service) {
    super($scope, utilService);
    this.inquiry = inquiry.data.data;
    this.payment = { order_id: this.inquiry.id };
    if (this.$stateParams.prizes) this.payment.prizes = Utils.toArray(this.$stateParams.prizes);
    // this.inquiry.total_price = parseFloat(this.inquiry.commercial) + parseFloat(this.inquiry.compulsory) + parseFloat(this.inquiry.tax);
  }

  getActualPay() {
    var actualPay = this.inquiry.quote_price;
    if (this.coupon) actualPay -= this.coupon.amounts;
    return actualPay;
  }

  needIdCard() {
    return _.startsWith(this.inquiry.city_id, '44');
  }

  buy() {
    this.utilService.showSpinner();
    if (this.coupon) this.payment.coupon_id = this.coupon.coupon_id;
    this.payment.id_card_front = Utils.toImageData(this.id_card.front);
    this.payment.id_card_back = Utils.toImageData(this.id_card.back);
    this.paymentService.buyLcb15Order(this.payment).then((data: any) => {
      // this.$state.go('order.pay', { order_id: data.data.data.order_id, order_type: 4 })
      // 强制微信浏览器更新当前地址栏，否则微信支付无法工作
      location.replace(`/order-pay?order_id=${data.data.data.order_id}&order_type=4`);
    }).finally(() => this.utilService.hideSpinner());
  }

}


export class Controller extends BuyController {}