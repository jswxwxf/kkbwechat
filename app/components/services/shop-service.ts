/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'shopService';

class ShopService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  getList() {
    return this._get('shop/list');
  }

  exchange(item) {
    return this._post('shop/exchange', { pid: item.pid });
  }

}

export class Service extends ShopService {};