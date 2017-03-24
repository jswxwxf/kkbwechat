/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'dvrService';

class DvrService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  private _getDvrHeaders(opts) {
    return {
      headers: super._getHeaders({
        'x-from': opts.from,
        'x-brand': opts.brand,
        'x-imei': opts.imei
      })
    }
  }

  getDailyTrips(day, opts) {
    return this._get(`trips/daily/${day}`, this._getDvrHeaders(opts));
  }

  deleteTrip(trip_id, opts) {
    return this._delete(`trips/${trip_id}`, this._getDvrHeaders(opts));
  }

  getWeeklySummary(opts, page = 1) {
    opts = this._getDvrHeaders(opts);
    opts.params = { page };
    return this._get(`summary/weekly`, opts);
  }

  getMonthlySummary(opts, page = 1) {
    opts = this._getDvrHeaders(opts);
    opts.params = { page };
    return this._get(`summary/monthly`, opts);
  }

  getLatestReport(opts) {
    return this._get(`report/latest`, this._getDvrHeaders(opts));
  }

  getCredits(opts) {
    return this._get(`credits`, this._getDvrHeaders(opts));
  }

  getCreditTasks(opts) {
    return this._get(`credits/tasks`, this._getDvrHeaders(opts));
  }

  doTaskVehicle(vehicle, opts) {
    return this._post(`credits/tasks/vehicle`, vehicle, this._getDvrHeaders(opts));
  }

  doTaskDriverLicense(license, opts) {
    return this._post(`credits/tasks/drvlicense`, license, this._getDvrHeaders(opts));
  }

  doTaskVehicleLicense(license, opts) {
    return this._post(`credits/tasks/vehlicense`, license, this._getDvrHeaders(opts));
  }

}

export class Service extends DvrService {}