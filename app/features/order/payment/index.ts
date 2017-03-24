/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import fanhua = require('./fanhua/index');

import buyController = require('./buy-controller');
import payController = require('./pay-controller');

export var load = (app: angular.IModule) => {
  app.controller(buyController.controllerName, buyController.Controller)
    .controller(payController.controllerName, payController.Controller);
  fanhua.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.buy', {
      url: '/buy?order_id&prizes',
      templateUrl: 'features/order/payment/buy.html',
      controller: buyController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        inquiry: ['$state', '$stateParams', common.utilService.serviceName, services.inquiryService.serviceName, ($state, $stateParams, utilService: common.utilService.Service, inquiryService: services.inquiryService.Service) => {
          utilService.showSpinner();
          return inquiryService.inquiryDetail($stateParams.order_id).success((data) => {
            if (_.isEmpty(data.data)) $state.go('order.result');
          }).finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('order.pay', {
      url: '/pay?order_id',
      templateUrl: 'features/order/payment/payment.html',
      controller: payController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        order: ['$state', '$stateParams', common.utilService.serviceName, services.orderService.serviceName, ($state, $stateParams, utilService: common.utilService.Service, orderService: services.orderService.Service) => {
          utilService.showSpinner();
          return orderService.getLcb15Order($stateParams.order_id).success((data) => {
            if (_.isEmpty(data.data) || data.data.status != '1') $state.go('order.list', { reload: true });
          }).finally(() => utilService.hideSpinner());
        }]
      }
    });

  fanhua.states($stateProvider);

};
