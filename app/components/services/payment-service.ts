/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import services = require('./index');
import models = require('../models/index');
import {PayTypes} from '../../enums/pay-types';

export var serviceName = 'paymentService';

class PaymentService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service) {
    super($q, $http, utilService);
  }

  buyLcb15Order(payment) {
    return this._post('lcb15/buy', payment);
  }

  cancelLcb15Order(order_id) {
    return this._post('/lcb15/cancel', { 'order_id': order_id });
  }

  payLcb15Order(payment) {
    return this.$q.when(payment).then((payment: any) => {
      return this._post('lcb15/pay', payment);
    }).then((charge: any) => {
      charge = charge.data.data;
      if (payment.pay_type == PayTypes.wechat_pub) {
        return this.wechatService.pay(payment, charge);
      }
      return this.pay(payment, charge);
    });
  }

  payCompensate2Order(compensate) {
    return this.$q.when(compensate).then((compensate: any) => {
      return this._post('payedentrap/buy', compensate);
    }).then((order: any) => {
      order = order.data.data;
      if (compensate.pay_type == PayTypes.wechat_pub) {
        return this.wechatService.pay(order.order, order.charge);
      }
    });
  }

  payTMOrder(order_id, payment) {
    return this.$q.when(order_id).then((order_id) => {
      return this._post(`tmorders/${order_id}/pay`, payment);
    }).then((charge: any) => {
      charge = charge.data.data;
      return this.pay(order_id, charge.charge);
    });
  }

  pay(payment, charge) {
    return this.$q((resolve, reject) => {
      pingpp.createPayment(charge, (result, error) => {
        if (result == 'success') return resolve(payment);
        if (result == 'fail') {
          this.utilService.alert(error.msg);
          return reject(payment);
        }
        if (result == 'cancel') return reject(payment);
      });
    });
  }

}

export class Service extends PaymentService {};