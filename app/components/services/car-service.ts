/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import services = require('./index');
import models = require('../models/index');
import enums = require('../../enums/index');

export var serviceName = 'carService';

class CarService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($q, $http, utilService);
  }

  getCars() {
    return this._get('cars');
  }

  getCar(car_id) {
    return this._get(`cars/${car_id}`);
  }

  addCar(car) {
    return this._post('cars', car);
  }

  updateCar(car) {
    return this._put(`cars/${car.car_id}`, car);
  }

  getStatus(car_id) {
    return this._get(`cars/${car_id}/ecu`);
  }

  getActiveCar() {
    return this.getActiveCarId().then((car_id) => this.getCar(car_id));
  }

  getActiveCarId(): angular.IPromise<any> {

    var defer = this.$q.defer();

    async.waterfall([
      (next) => {
        this.userService.getProfile().success((data) => {
          next(null, data.data.vehicle_id);
        });
      },
      (car_id, next) => {
        if (car_id != '' && car_id != '0' && car_id != null) return next(null, { car_id: car_id, retrieved: true });
        this.getCars().success((data) => {
          var cars = data.data;
          var car = cars[0];
          if (!car) return next({ code: enums.errors.Errors.NoCar, error: '系统还没有配置任何车辆' });
          next(null, car);
        });
      },
      (car, done) => {
        if (car.retrieved) return done(null, car.car_id);
        this.setActiveCarId(car.car_id).then(() => done(null, car.car_id));
      }
    ], (err, car_id) => {
      if (err) return defer.reject(err);
      defer.resolve(car_id);
    });

    return defer.promise;

  }

  setActiveCarId(car_id): angular.IPromise<any> {
    return this.$q((resolve, reject) => {
      this.userService.updateProfile({ vehicle_id: car_id }).success(() => resolve(car_id))
    });
  }

  getActiveCarSafety() {
    return this.getActiveCarId().then((car_id) => {
      return this.getCarSafety(car_id).success((data) => {
        data.car_id = car_id;
        return data;
      });
    });
  }

  getCarSafety(car_id) {
    return this._get(`cars/${car_id}/setting`);
  }

  setCarSafety(car_id, safety) {
    return this._put(`cars/${car_id}/setting`, safety);
  }

  getActiveCarAssess(): angular.IPromise<any> {
    return this.getActiveCarId().then((car_id) => {
      return this.getCarAssess(car_id).success((data) => {
        data.car_id = car_id;
        return data;
      });
    });
  }

  getCarAssess(car_id) {
    return this._get(`cars/${car_id}/assess`);
  }

}

export class Service extends CarService {};