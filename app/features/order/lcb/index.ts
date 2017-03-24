/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import orderController = require('./order-controller');

export var load = (app: angular.IModule) => {
  app.controller(orderController.controllerName, orderController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.lcb', {
      url: '/lcb?order_id&order_type&product_id',
      templateUrl: (params: any) => {
        if (params.order_type == 3) return 'features/order/lcb/lcb10.html';
        // 剩下的应该都是 order_type == 4
        if (params.product_id == 1) return 'features/order/lcb/hunt.html';    // 优选
        if (params.product_id == 0 || params.product_id == 2) return 'features/order/lcb/green.html';   // 绿色
        if (params.product_id == 3) return 'features/order/lcb/auto.html';    // 凹凸
        if (params.product_id == 4) return 'features/order/lcb/hx.html';      // 惠选
      },
      controller: orderController.controllerName,
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
