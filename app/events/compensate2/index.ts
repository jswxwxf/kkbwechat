/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import introController = require('./intro-controller');
import buyController = require('./buy-controller');
import orderController = require('./order-controller');
import claimController = require('./claim-controller');

export var load = (app: angular.IModule) => {
  app.controller(introController.controllerName, introController.Controller)
    .controller(buyController.controllerName, buyController.Controller)
    .controller(orderController.controllerName, orderController.Controller)
    .controller(claimController.controllerName, claimController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('compensate2', {
      abstract: true,
      url: '/compensate2',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('compensate2.intro', {
      url: '/intro',
      templateUrl: '../../features/insurance/compensate2/intro.html',
      controller: introController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('compensate2.buy', {
      url: '/buy',
      templateUrl: '../../features/insurance/compensate2/compensate.html',
      controller: buyController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        products: [services.insuranceService.serviceName, (insuranceService: services.insuranceService.Service) => insuranceService.getCompensate2Products()]
      }
    })
    .state('compensate2.order', {
      url: '/order?order_id',
      templateUrl: '../../features/order/compensate2/compensate.html',
      controller: orderController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        compensate: ['$stateParams', services.insuranceService.serviceName, ($stateParams, insuranceService: services.insuranceService.Service) => insuranceService.getCompensate2($stateParams.order_id)]
      }
    })
    .state('compensate2.claim', {
      url: '/claim?order_id',
      templateUrl: '../../features/claim/compensate2/compensate.html',
      controller: claimController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        compensate: ['$stateParams', services.insuranceService.serviceName, ($stateParams, insuranceService: services.insuranceService.Service) => insuranceService.getCompensate2($stateParams.order_id)]
      }
    });

};
