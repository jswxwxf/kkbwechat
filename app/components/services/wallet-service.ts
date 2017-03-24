/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'walletService';

class WalletService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  getWallet() {
    return this._get('wallet');
  }

  getBalance(page = 1) {
    return this._get('balance', { params: { page: page } });
  }

  draw(amount) {
    return this._post('wallet/encash', amount);
  }

  getBean(page = 1) {
    return this._get('bean', { params: { page: page } });
  }

  getCoupon(page = 1) {
    return this._get('wallet/card/dkq', { params: { page: page } });
  }

  getAvailableCoupon() {
    return this._get('lcb15/dkq');
  }

  getYcb(page = 1) {
    return this._get('wallet/card/ycb', { params: { page: page } });
  }

  getTicket(page = 1) {
    return this._get('wallet/card/ticket', { params: { page: page } });
  }

  applyKld(kld) {
    return this._post('wallet/card/kld', kld);
  }

}

export class Service extends WalletService {};