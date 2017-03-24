/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import carInfoController = require('./carinfo-controller');
import driverLicenseController = require('./driverlicense-controller');
import vehicleLicenseController = require('./vehiclelicense-controller');

export var load = (app: angular.IModule) => {
  app.controller(carInfoController.controllerName, carInfoController.Controller)
    .controller(driverLicenseController.controllerName, driverLicenseController.Controller)
    .controller(vehicleLicenseController.controllerName, vehicleLicenseController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('dvr2.task', {
      abstract: true,
      url: '/task',
      resolve: {
        activeCar: [services.carService.serviceName, (carService: services.carService.Service) => carService.getActiveCar()]
      }
    })
    .state('dvr2.task.carinfo', {
      url: '/carinfo',
      views: {
        '@': {
          templateUrl: '../../../features/dvr/task/carinfo.html',
          controller: carInfoController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr2.task.vehiclelicense', {
      url: '/vehiclelicense',
      views: {
        '@': {
          templateUrl: 'features/dvr/task/vehiclelicense.html',
          controller: vehicleLicenseController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr2.task.driverlicense', {
      url: '/driverlicense',
      views: {
        '@': {
          templateUrl: 'features/dvr/task/driverlicense.html',
          controller: driverLicenseController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
