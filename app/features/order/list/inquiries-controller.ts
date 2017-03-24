/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.list.InquiriesController';

class InquiriesController extends BaseController {

  static $inject = ['$scope', 'inquiries', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private inquiries, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.inquiries = inquiries.data.data;
  }

}


export class Controller extends InquiriesController {}