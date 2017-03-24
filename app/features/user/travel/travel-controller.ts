/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.travel.TravelController';

class TravelController extends BaseController {

  user: models.user.Model = new models.user.Model();
  car;
  summary;
  travels;
  paginator;

  static $inject = ['$scope', 'profile', common.utilService.serviceName, services.carService.serviceName, services.rewardService.serviceName];

  constructor(private $scope, private profile, private utilService: common.utilService.Service, private carService: services.carService.Service, private rewardService: services.rewardService.Service) {
    super($scope, utilService);
    this.user = profile.data.data;
    this.utilService.showSpinner();
    this._loadActiveCar().then((data) => {
      this.car = data.data.data;
      this.loadTravel(this.car);
    }).catch((err) => this.utilService.handleNoCar());
  }

  private _loadActiveCar() {
    return this.carService.getActiveCarId().then((car_id) => this.carService.getCar(car_id));
  }

  loadWeek(day, forward) {
    this.loadTravel(this.car, day);
  }

  loadTravel(car, date?) {
    this.car = car;
    if (!date) {
      date = Date.now();
      this.paginator.reset();
    }
    this.utilService.showSpinner();
    return this.rewardService.getWeeklyTravels(car.car_id, date).success((data) => {
      this.summary = data.data.summary;
      this.travels = data.data.scores;
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends TravelController {}