/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'dvr.ScoreController';

export class ScoreController extends BaseController {

  option;
  chartData;
  summary;

  static $inject = ['$scope', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
  }

  switch(option) {
    this.utilService.showSpinner();
    this.option = option;
    var fnName = option.value == 7 ? 'getWeeklyScores' : 'getMonthlyScores';
    return this.dvrService[fnName]().then((data) => {
      this.chartData = data.data.data.scores;
      this.summary = data.data.data.summary;
      this.summary.duration = Utils.formatDuration(this.summary.duration);
    }).finally(() => this.utilService.hideSpinner());
  }


}

export class Controller extends ScoreController {}