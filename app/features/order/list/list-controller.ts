/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.list.ListController';

class ListController extends BaseController {

  static $inject = ['$scope', 'orders', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private orders, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.orders = orders.data.data;
  }

}


export class Controller extends ListController {}