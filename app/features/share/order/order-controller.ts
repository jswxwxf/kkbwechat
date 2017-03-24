/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'orderController';

export class OrderController extends BaseController {

  static $inject = ['$scope', 'order', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private order, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    super.setModalSrc('green-agreement', '/features/insurance/lcb/agreement.html');
    super.setModalSrc('auto-agreement', '/features/share/register/agreements/auto.html');
    this.order = order.data.data;
  }

  isEvent() {
    return this.order.event_id != '0';
  }

}

export class Controller extends OrderController {}
