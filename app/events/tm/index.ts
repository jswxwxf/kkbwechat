/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import orderController = require('./order-controller');

export var load = (app: angular.IModule) => {
  app.controller(orderController.controllerName, orderController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('tm', {
      abstract: true,
      url: '/tm',
      template: '<ion-nav-view></ion-nav-view>',
    })
    .state('tm.order', {
      url: '/order?order_id',
      templateUrl: 'events/tm/hunt.html',
      controller: orderController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        order: ['$stateParams', services.orderService.serviceName, ($stateParams, orderService: services.orderService.Service) => orderService.getTMOrder($stateParams.order_id)]
      }
    })


};
