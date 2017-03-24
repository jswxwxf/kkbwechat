/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'orderService';

class OrderService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  getOrders() {
    return this._get('orders');
  }

  getLcb15Order(order_id) {
    return this._get(`orders/${order_id}`);
  }

  cancelLcb15Order(order_id) {
    return this._delete(`orders/${order_id}`);
  }

  getLcb10Order(order_id) {
    return this._get(`orders/lcb10/${order_id}`);
  }

  getTMOrder(order_id) {
    return this._get(`tmorders/${order_id}`);
  }

}

export class Service extends OrderService {};