/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import evalController = require('./eval-controller');

export var load = (app: angular.IModule) => {
  app.controller(evalController.controllerName, evalController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.eval', {
      url: '/eval',
      templateUrl: 'features/insurance/eval/eval.html',
      controller: evalController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        options: ['$q', common.utilService.serviceName, services.insuranceService.serviceName, ($q: angular.IQService, utilService: common.utilService.Service, insuranceService: services.insuranceService.Service) => {
          utilService.showSpinner();
          return insuranceService.getEvalOptions().finally(() => utilService.hideSpinner());
        }]
      }
    });

};
