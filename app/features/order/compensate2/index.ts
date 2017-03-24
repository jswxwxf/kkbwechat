/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {Errors} from "../../../enums/errors";

import compensateController = require('./compensate-controller');

export var load = (app: angular.IModule) => {
  app.controller(compensateController.controllerName, compensateController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.compensate2', {
      url: '/compensate2?order_id',
      templateUrl: 'features/order/compensate2/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        compensate: ['$stateParams', services.insuranceService.serviceName, ($stateParams, insuranceService: services.insuranceService.Service) => insuranceService.getCompensate2($stateParams.order_id)]
      }
    });

};
