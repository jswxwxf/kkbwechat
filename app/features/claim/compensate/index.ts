/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import compensateController = require('./compensate-controller');

export var load = (app: angular.IModule) => {
  app.controller(compensateController.controllerName, compensateController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('claim.compensate', {
      url: '/compensate',
      templateUrl: 'features/claim/compensate/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        compensate: [common.utilService.serviceName, services.insuranceService.serviceName, (utilService: common.utilService.Service, insuranceService: services.insuranceService.Service) => {
          utilService.showSpinner();
          return insuranceService.getCompensate().finally(() => utilService.hideSpinner());
        }]
      }
    });

};
