/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'dvr.EarningController';

export class EarningController extends BaseController {

  chartData;

  static $inject = ['$scope', '$stateParams', 'credits', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $stateParams, private credits, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    this.credits = credits.data.data;
    this.chartData = credits.data.data.credits;
  }

}

export class Controller extends EarningController {}