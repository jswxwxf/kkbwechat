/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import services = require('./index');
import models = require('../models/index');

export var serviceName = 'deviceService';

class DeviceService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName, services.carService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService: common.utilService.Service, private carService: services.carService.Service) {
    super($q, $http, utilService);
  }

  getDevices() {
    return this._get(`devices`);
  }

  bindDevice(device) {
    return this._post('devices', device);
  }

  bindCar(car, device) {
    return this._put(`cars/${car.car_id}/bind`, device);
  }

  getDevice(car_id) {
    return this._get(`cars/${car_id}/device`);
  }

  getActiveDevice() {
    return this.$q((resolve, reject) => {
      this.carService.getActiveCarId().then((car_id) => {
        resolve(this.getDevice(car_id));
      });
    });
  }

}

export class Service extends DeviceService {};