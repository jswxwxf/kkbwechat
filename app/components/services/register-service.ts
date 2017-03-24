/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'registerService';

class RegisterService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  sendGreenCode(mobile) {
    return this._post('send/green', { mobile: mobile });
  }

  registerGreen(registry, anonymous, opts?) {
    if (anonymous) return this._post('green', registry, opts);
    return this._post('apply/green', registry, opts);
  }

  sendAutoCode(mobile) {
    return this._post('send/aotuzu', { mobile: mobile });
  }

  registerAuto(registry, anonymous, opts?) {
    if (anonymous) return this._post('aotuzu', registry, opts);
    return this._post('apply/aotuzu', registry, opts);
  }

  sendHuntCode(mobile) {
    return this._post('send/hcz', { mobile: mobile });
  }

  registerHunt(registry, anonymous, opts?) {
    if (anonymous) return this._post('hcz', registry, opts);
    return this._post('apply/hcz', registry, opts);
  }

  sendHunt2Code(mobile) {
    return this._post('send/dcf', { mobile: mobile });
  }

  registerHunt2(registry) {
    return this._post('dcf', registry);
  }

}

export class Service extends RegisterService {}