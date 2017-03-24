/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import deviceController = require('./device-controller');
import bindDeviceController = require('./bind-device-controller');
import bindCarController = require('./bind-car-controller');

export var load = (app: angular.IModule) => {
  app.controller(deviceController.controllerName, deviceController.Controller)
    .controller(bindDeviceController.controllerName, bindDeviceController.Controller)
    .controller(bindCarController.controllerName, bindCarController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.device', {
      cache: false,
      url: '/device',
      templateUrl: 'features/user/device/device.html',
      controller: deviceController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        cars: [common.utilService.serviceName, services.carService.serviceName, (utilService: common.utilService.Service, carService: services.carService.Service) => {
          utilService.showSpinner();
          return carService.getCars().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.device.bind', {
      abstract: true,
      url: '/bind',
    })
    .state('user.device.bind.device', {
      url: '/device',
      views: {
        "@user": {
          templateUrl: 'features/user/device/bind-device.html',
          controller: bindDeviceController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('user.device.bind.car', {
      url: '/car?device_id',
      views: {
        "@user": {
          templateUrl: 'features/user/device/bind-car.html',
          controller: bindCarController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('user.device.bind.result', {
      url: '/result',
      views: {
        "@user": {
          templateUrl: 'features/user/device/bind-result.html'
        }
      }
    });

};
