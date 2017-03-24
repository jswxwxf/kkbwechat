/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import stolenController = require('./stolen-controller');

export var load = (app: angular.IModule) => {
  app.controller(stolenController.controllerName, stolenController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.stolen', {
      url: '/stolen?order_id&order_type',
      templateUrl: 'features/order/stolen/stolen.html',
      controller: stolenController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        stolen: ['$stateParams', common.utilService.serviceName, services.insuranceService.serviceName, ($stateParams, utilService: common.utilService.Service, insuranceService: services.insuranceService.Service) => {
          utilService.showSpinner();
          return insuranceService.getStolen($stateParams.order_id).finally(() => utilService.hideSpinner());
        }]
      }
    });

};
