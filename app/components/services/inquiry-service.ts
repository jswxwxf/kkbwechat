/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'inquiryService';

class InquiryService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  getProducts(city_id) {
    return this._get(`quote/${city_id}/product`);
  }

  inquiryBasic(inquiry) {
    return this._post(`quote/basic`, {
      product_id: inquiry.product_id,
      license_no: inquiry.license_no
    });
  }

  inquiryMore(inquiry) {
    return this._post(`quote/more`, {
      product_id: inquiry.product_id,
      city_id: inquiry.city.code,
      license_no: inquiry.license_no
    })
  }

  commitInquiry(inquiry) {
    return this._post(`quote/result`, inquiry);
  }

  inquiryDetail(id) {
    return this._get(`quote/detail/${id}`);
  }

  inquiryList() {
    return this._get(`quote/lists`);
  }

  getPrizes() {
    return this._get(`quote/prizes`);
  }

  saveLicense(license) {
    return this._post(`quote/license`, license);
  }

}

export class Service extends InquiryService {};