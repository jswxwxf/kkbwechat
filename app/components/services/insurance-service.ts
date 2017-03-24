/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'insuranceService';

class InsuranceService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  inquiryLcb15(lcb) {
    return this._post('lcb15/quoted', lcb);
  }

  getLcb15Inquiries() {
    return this._get('lcb15/quoted');
  }

  getLcb15Inquiry(order_id) {
    return this._get(`lcb15/quoted/${order_id}`);
  }

  updateLcb15Inquiry(inquiry) {
    return this._put('lcb15/quoted', inquiry);
  }

  getTotalCompensate() {
    return this._get('entrapments/total');
  }

  sendCompensateCode(mobile) {
    return this._post('send/entrapments', { mobile: mobile });
  }

  applyCompensate(compensate) {
    return this._post('entrapments', compensate);
  }

  activeCompensate() {
    return this._post('active/entrapments', {});
  }

  getCompensate() {
    return this._get('entrapments');
  }

  claimCompensate(compensate) {
    return this._post('claim/entrapments', compensate);
  }

  getCompensate2Products() {
    return this._get('payedentrap/products');
  }

  sendCompensate2Code(mobile) {
    return this._post('send/payedentrap', { mobile: mobile });
  }

  getCompensate2(order_id) {
    return this._get(`payedentrap/${order_id}`);
  }

  claimCompensate2(order_id, compensate) {
    return this._post(`payedentrap/${order_id}/claim`, compensate);
  }

  sendStolenCode(mobile) {
    return this._post('send/stolen', { mobile: mobile });
  }

  applyStolen(stolen) {
    return this._post('stolen', stolen);
  }

  activeStolen(ukey) {
    return this._post('stolen/forward', { ukey: ukey });
  }

  getStolen(order_id) {
    return this._get(`stolen/${order_id}`);
  }

  getEvalOptions() {
    return this._get('quoted/options');
  }

  quickEval(params) {
    return this._post('quoted/quick', params);
  }

	yobeeQuoteBasic(data) {
		return this._post('lcb15/quoted2/basic', data);
	}

	yobeeQuoteMore(data) {
		return this._post('lcb15/quoted2/more', data);
	}

	yobeeQuoteResult(data) {
		return this._post('lcb15/quoted2/result', data);
	}

	axaQuoteBasic(data) {
		return this._post('quote/axa/basic', data);
	}

	axaQuoteMore(data) {
		return this._post('quote/axa/more', data);
	}

	axaQuoteResult(data) {
		return this._post('quote/axa/result', data);
	}
}

export class Service extends InsuranceService {};