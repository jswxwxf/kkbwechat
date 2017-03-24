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
    .state('order.compensate', {
      url: '/compensate',
      templateUrl: 'features/order/compensate/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        compensate: ['$state', services.insuranceService.serviceName, ($state, insuranceService: services.insuranceService.Service) => insuranceService.getCompensate()]
      }
    });

};
