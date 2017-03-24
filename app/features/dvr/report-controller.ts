/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'dvr.ReportController';

export class ReportController extends BaseController {

  static $inject = ['$scope', '$location', 'report', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $location, private report, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    this.report = report.data.data;
    this._prepareReport();
  }

  private _prepareReport() {
    var total = _.sum(this.report.time_range);
    this.report.time_range[1] /= total;
    this.report.time_range[2] /= total;
    this.report.time_range[3] /= total;
  }

  hasGrade() {
    return Utils.toLower(this.report.grade) != 'n';
  }

  inquiry() {
    location.assign(`${location.origin}/#/order/inquiry/basic?product_id=4`);
  }

}

export class Controller extends ReportController {}