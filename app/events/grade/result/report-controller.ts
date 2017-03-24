/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {ReportController} from "../../../features/user/grade/report-controller";

export var controllerName = 'grade.report.ReportController';

export class EventReportController extends ReportController {

  constructor(protected $scope, protected $q: angular.IQService, protected $state, protected $stateParams, protected activeCar, protected report, protected utilService: common.utilService.Service, protected userService: services.userService.Service, protected wechatService: services.wechatService.Service, protected jsBridgeService: services.jsBridgeService.Service) {
    super($scope, $q, $state, $stateParams, activeCar, report, utilService, userService, wechatService, jsBridgeService);
    this.activeCar = activeCar.data.data;
    this.report = report.data.data;
  }

}

export class Controller extends EventReportController {}