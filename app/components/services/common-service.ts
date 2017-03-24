/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'commonService';

var oils = [
  { oil_id: '1', oil_type: '汽油', name_cn: '92号' },
  { oil_id: '2', oil_type: '汽油', name_cn: '93号' },
  { oil_id: '3', oil_type: '汽油', name_cn: '95号' },
  { oil_id: '4', oil_type: '汽油', name_cn: '97号' },
  { oil_id: '5', oil_type: '柴油', name_cn: '0号' },
  { oil_id: '6', oil_type: '柴油', name_cn: '10号' },
  { oil_id: '7', oil_type: '柴油', name_cn: '20号' },
  { oil_id: '8', oil_type: '柴油', name_cn: '35号' }
];

class CommonService extends baseService.Service {

  commonDataCache = this.cacheFactory('commonDataCache');

  static $inject = ['$q', '$http', 'CacheFactory', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private cacheFactory, public utilService) {
    super($q, $http, utilService);
  }

  getProvinces() {
    return this._get('provinces');
  }

  getCities() {
    return this._get('cities');
  }

  getRegions() {
    return this._get('regions', { cache: this.commonDataCache });
  }

  getInquiryCities() {
    return this._get('quote/axa/cities');
  }

  getCityCompanies(city_id) {
    return this._get(`cities/${city_id}/companies`);
  }

  getBrands() {
    return this._get('brands', { cache: this.commonDataCache });
  }

  getSeries(brand_id) {
    return this._get(`series/${brand_id}`, { cache: this.commonDataCache });
  }

  getModel(series_id) {
    return this._get(`models/${series_id}`, { cache: this.commonDataCache });
  }

  getOils() {
    return this.$q.when(oils);
  }

  getOilsSync() {
    return oils;
  }

}

export class Service extends CommonService {};