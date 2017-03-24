/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import introController = require('./intro-controller');
import compensateController = require('./compensate-controller');

export var load = (app: angular.IModule) => {
  app.controller(introController.controllerName, introController.Controller)
    .controller(compensateController.controllerName, compensateController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.compensate2', {
      url: '/compensate2',
      templateUrl: 'features/insurance/compensate2/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        products: [services.insuranceService.serviceName, (insuranceService: services.insuranceService.Service) => insuranceService.getCompensate2Products()]
      }
    })
    .state('insurance.compensate2.intro', {
      url: '/intro',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/compensate2/intro.html',
          controller: introController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
