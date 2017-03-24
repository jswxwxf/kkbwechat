/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import listController = require('./list-controller');

export var load = (app: angular.IModule) => {
  app.controller(listController.controllerName, listController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('claim.list', {
      url: '/list',
      templateUrl: 'features/claim/list/list.html',
      controller: listController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        orders: ['$q', common.utilService.serviceName, services.orderService.serviceName, ($q: angular.IQService, utilService: common.utilService.Service, orderService: services.orderService.Service) => {
          return $q((resolve, reject) => {
            utilService.showSpinner();
            orderService.getOrders().success((data) => {
              resolve(_.reject(data.data, (order: any) => _.contains(['4', '5'], order.order_type)));  // 开开保 1.5 没有返现页面
            }).finally(() => utilService.hideSpinner());
          })
        }]
      }
    })

};
