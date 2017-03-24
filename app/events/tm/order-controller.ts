/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'tm.OrderController';

class OrderController extends BaseController {

  static $inject = ['$scope', 'order', common.utilService.serviceName, services.paymentService.serviceName];

  constructor(private $scope: angular.IScope, private order, private utilService: common.utilService.Service, private paymentService: services.paymentService.Service) {
    super($scope, utilService);
    this.order = order.data.data;
  }

  pay() {
    this.utilService.showSpinner();
    this.paymentService.payTMOrder(this.order.id, {
      success_url: location.href,
      cancel_url: location.href,
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends OrderController {}