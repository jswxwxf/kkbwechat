/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import compensateController = require('./compensate-controller');

export var load = (app: angular.IModule) => {
  app.controller(compensateController.controllerName, compensateController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.compensate', {
      url: '/compensate',
      templateUrl: 'features/insurance/compensate/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        total: [common.utilService.serviceName, services.insuranceService.serviceName, (utilService: common.utilService.Service, insuranceService: services.insuranceService.Service) => {
          utilService.hideSpinner();
          return insuranceService.getTotalCompensate().finally(() => utilService.hideSpinner());
        }],
        compensate: ['$q', '$state', '$timeout', common.utilService.serviceName, services.insuranceService.serviceName, ($q: angular.IQService, $state: angular.ui.IStateService, $timeout: angular.ITimeoutService, utilService: common.utilService.Service, insuranceService: services.insuranceService.Service) => {
          // 检查是否申请过, 如果申请过, 跳到订单页面
          return $q((resolve, reject) => {
            utilService.showSpinner();
            insuranceService.getCompensate().success((data) => {
              if (!_.isEmpty(data.data)) {
                $state.go('order.compensate');
                return reject({ code: enums.errors.Errors.GeneralError, error: '已申请' });
              }
              resolve({ data: data });
            }).finally(() => utilService.hideSpinner());
          });
        }]
      }
    });

};
