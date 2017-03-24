/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import lcbController = require('./lcb-controller');

export var load = (app: angular.IModule) => {
  app.controller(lcbController.controllerName, lcbController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('claim.lcb', {
      url: '/lcb?order_id?order_type',
      templateUrl: (params: any) => {
        return {
          3: 'features/claim/lcb/lcb10.html'
        }[params.order_type];
      },
      controller: lcbController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        order: ['$stateParams', common.utilService.serviceName, services.orderService.serviceName, ($stateParams, utilService: common.utilService.Service, orderService: services.orderService.Service) => {
          utilService.showSpinner();
          var typeName = enums.orderTypes.OrderTypes[$stateParams.order_type];
          var method = 'get' + typeName + 'Order';
          return orderService[method]($stateParams.order_id).finally(() => utilService.hideSpinner());
        }]
      }
    });

};
