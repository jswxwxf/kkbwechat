/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.travel.RewardController';

class RewardController extends BaseController {

  user: models.user.Model = new models.user.Model();
  car;
  rewards;
  paginator;

  pagesrc;

  static $inject = ['$scope', '$q', 'profile', common.utilService.serviceName, services.carService.serviceName, services.rewardService.serviceName];

  constructor(private $scope, private $q: angular.IQService, private profile, private utilService: common.utilService.Service, private carService: services.carService.Service, private rewardService: services.rewardService.Service) {
    super($scope, utilService);
    this.user = profile.data.data;
    this.utilService.showSpinner();
    this._loadActiveCar().then((data: any) => {
      this.car = data.data.data;
      this.reload(this.car);
    }).catch((err) => {
      this.pagesrc = 'features/user/reward/pages/kkb.html';
      setTimeout(() => this.utilService.handleNoCar(), 200);
    });
  }

  private _loadActiveCar() {
    return this.carService.getActiveCarId().then((car_id) => this.carService.getCar(car_id));
  }

  loadWeek(day, forward) {
    this.loadReward(this.car, day);
  }

  reload(car) {
    this.car = car;
    this.$q.when(car).then((car: any) => {
      if (car.event_id) return car.event_id;
      this.utilService.showSpinner();
      return this.carService.getCar(car.car_id).then((data) => data.data.data.event_id).finally(() => this.utilService.hideSpinner());
    }).then((event_id) => {
      // 凹凸
      if (event_id == '2') {
        this.pagesrc = 'features/user/reward/pages/auto.html';
        this.loadAuto(this.car);
        return;
      }
      this.pagesrc = 'features/user/reward/pages/kkb.html';
      this.loadReward(this.car);
    })
  }

  loadReward(car, date?) {
    if (!date) {
      date = Date.now();
      if (this.paginator) this.paginator.reset();
    }
    this.utilService.showSpinner();
    return this.rewardService.getWeeklyRewards(car.car_id, date).success((data) => {
      this.rewards = _(data.data.rewards).forEach((reward: any) => {
        if (!reward) return;
        reward.color = reward.type == '1' ? 'lcb-default-color' : 'lcb-assertive-color';
      }).value();
    }).finally(() => this.utilService.hideSpinner());
  }

  loadAuto(car) {
    this.utilService.showSpinner();
    return this.rewardService.getAutoReward(car.car_id).success((data) => this.rewards = data.data).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends RewardController {}