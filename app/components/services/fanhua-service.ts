/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export let serviceName = 'fanhuaService';

class FanhuaService extends baseService.Service {

  static $inject = ['$q', '$http', 'CacheFactory', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private cacheFactory, public utilService) {
    super($q, $http, utilService);
  }

  getRegions() {
    return this._dget('fanhua/cities');
  }

  getProviders(city) {
    return this._dget(`fanhua/cities/${city}/providers`);
  }

  searchCar(inquiry) {
    let payload = angular.merge({
      pageSize: 10,
      pageNum: 1
    }, inquiry);
    return this._dpost('fanhua/cars/search', payload);
  }

  searchInquiry(inquiry, opts?) {
    let payload = {
      insureAreaCode: _.get(inquiry, 'insureAreaCode.code'),
      carInfo: {
        carLicenseNo: _.get(inquiry, 'carInfo.carLicenseNo')
      },
      carOwner: {
        name: _.get(inquiry, 'carOwner.name'),
        idcardNo: _.get(inquiry, 'carOwner.idcardNo')
      }
    };
    return this._dpost('fanhua/quotes/search', payload, opts);
  }

  submitInquiry(inquiry, opts?) {
    return this._dpost(`fanhua/quotes`, inquiry, opts);
  }

  getInquiry(id) {
    return this._dget(`fanhua/quotes/${id}`);
  }

  deleteInquiry(id) {
    return this._ddelete(`fanhua/quotes/${id}`);
  }

  pay(inquiry) {
    return this._dpost(`fanhua/quotes/${inquiry.taskId}/pay`, inquiry);
  }

  uploadImages(id, prvId, images) {
    return this._dpost(`fanhua/quotes/${id}/${prvId}/images`, images);
  }

  submitInsure(id, insure) {
    return this._dpost(`fanhua/insures/${id}`, insure);
  }

  refund(id, insure) {
    return this._dpost(`fanhua/insures/${id}/refund`, insure);
  }

  inquiryList(userId) {
    return this._dget(`fanhua/quotes?userId=${userId}`);
  }

}

export class Service extends FanhuaService {}