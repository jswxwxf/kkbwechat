/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'rewardService';

class RewardService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, public utilService) {
    super($q, $http, utilService);
  }

  getWeeklyRewards(car_id, date) {
    var monday = moment(date).isoWeekday(1).format('YYYY-MM-DD');
    return this._get(`rewards/cars/${car_id}/weekly/${monday}`);
  }

  getWeeklyTravels(car_id, date) {
    var monday = moment(date).isoWeekday(1).format('YYYY-MM-DD');
    return this._get(`trips/cars/${car_id}/weekly/${monday}`);
  }

  getAutoReward(car_id) {
    return this._get(`rewards/cars/${car_id}/atzuche`);
  }

}

export class Service extends RewardService {};