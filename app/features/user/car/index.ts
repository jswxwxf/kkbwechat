/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import carController = require('./car-controller');
import editController = require('./edit-controller');
import safetyController = require('./safety-controller');
import selectController = require('./select-controller');

export var load = (app: angular.IModule) => {
  app.controller(carController.controllerName, carController.Controller)
    .controller(editController.controllerName, editController.Controller)
    .controller(safetyController.controllerName, safetyController.Controller)
    .controller(selectController.controllerName, selectController.Controller);
};

var prepareCarData = ['$q', '$stateParams', common.utilService.serviceName, services.commonService.serviceName, services.carService.serviceName, ($q: angular.IQService, $stateParams, utilService, commonService, carService) => {
  utilService.showSpinner();
  return $q.all({
    brands: commonService.getBrands(),
    oils: commonService.getOils(),
  }).finally(() => utilService.hideSpinner());
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.car', {
      url: '/car?car_id',
      templateUrl: 'features/user/car/car.html',
      controller: carController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        car_id: ['$q', '$state', '$stateParams', '$timeout', common.utilService.serviceName, services.carService.serviceName, ($q: angular.IQService, $state: angular.ui.IStateService, $stateParams, $timeout, utilService: common.utilService.Service, carService: services.carService.Service) => {
          utilService.showSpinner();
          if ($stateParams.car_id) {
            return carService.setActiveCarId($stateParams.car_id).finally(() => utilService.hideSpinner());
          } else {
            return carService.getActiveCarId().catch((err) => {
              console.log(err.error);
              return null;
            }).finally(() => utilService.hideSpinner());
          }
        }]
      }
    })
    .state('user.car.select', {
      url: '/select',
      views: {
        "@user": {
          templateUrl: 'features/user/car/select.html',
          controller: selectController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            cars: [common.utilService.serviceName, services.carService.serviceName, (utilService: common.utilService.Service, carService: services.carService.Service) => {
              utilService.showSpinner();
              return carService.getCars().finally(() => utilService.hideSpinner());
            }]
          }
        }
      },
    })
    .state('user.car.add', {
      url: '/add',
      views: {
        "@user": {
          templateUrl: 'features/user/car/edit.html',
          controller: editController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            data: prepareCarData,
            car_id: () => null
          }
        }
      }
    })
    .state('user.car.edit', {
      url: '/edit',
      views: {
        "@user": {
          templateUrl: 'features/user/car/edit.html',
          controller: editController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            data: prepareCarData
          }
        }
      }
    })
    .state('user.car.status', {
      url: '/status',
      views: {
        "@user": {
          templateUrl: 'features/user/car/status.html',
          controller: carController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('user.car.safety', {
      url: '/safety',
      views: {
        "@user": {
          templateUrl: 'features/user/car/safety.html',
          controller: safetyController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            safety: [common.utilService.serviceName, services.carService.serviceName, (utilService: common.utilService.Service, carService: services.carService.Service) => {
              utilService.showSpinner();
              return carService.getActiveCarSafety().finally(() => utilService.hideSpinner());
            }]
          }
        }
      }
    });

};
