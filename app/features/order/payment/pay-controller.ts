/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Config} from "../../../config/config";
import {PayTypes} from "../../../enums/pay-types";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.payment.PayController';

class PayController extends BaseController {

  payment;

  static $inject = ['$scope', '$state', 'order', common.utilService.serviceName, services.paymentService.serviceName];

  constructor(private $scope, private $state, private order, private utilService: common.utilService.Service, private paymentService: services.paymentService.Service) {
    super($scope, utilService);
    this.order = order.data.data;
    this.payment = {
      order_id: parseInt(this.order.order_id),
      pay_type: parseInt(this.order.pay_type),
      success_url: `${location.origin}/#/order/list?payed=true`,
      cancel_url: `${location.origin}/#/order/list`
    };
    if (_.includes([1, 3], this.payment.pay_type)) delete this.payment.pay_type;     // 处理之前的错误 POS pay_type
    if (!Config.inWechat() && this.payment.pay_type == PayTypes.wechat_pub) delete this.payment.pay_type;   // 如果不在微信下, 则不能使用微信支付
  }

  cancel() {
    this.utilService.showSpinner();
    this.paymentService.cancelLcb15Order(this.order.order_id).then((data: any) => this.utilService.returnBack('welcome')).finally(() => this.utilService.hideSpinner());
  }

  pay() {
    this.utilService.showSpinner();
    this.paymentService.payLcb15Order(this.payment).then((data: any) => {
      this.utilService.hideSpinner();
      if (this.payment.pay_type != PayTypes.pos) this.utilService.alert('工作日当天16点前成功支付，我们将在当天为您出单；其他时间支付将在下一工作日为您出单；出单后我们将短信通知您！', { title: '支付成功！' }).then(() => this.$state.go('order.list', { reload: true }));
      this.$state.go('order.list', { reload: true });
    }).finally(() => this.utilService.hideSpinner());
  }

}


export class Controller extends PayController {}