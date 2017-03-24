/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');

import fanhuaController = require('./fanhua-controller');
import fanhuaDetailController = require('./fanhua-detail-controller');

export let load = (app: angular.IModule) => {
  app.controller(fanhuaController.controllerName, fanhuaController.Controller)
    .controller(fanhuaDetailController.controllerName, fanhuaDetailController.Controller);
};

export let states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.fanhua', {
      url: '/fanhua?inquiry_id',
      templateUrl: 'features/order/result/fanhua/fanhua.html',
      controller: fanhuaController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        inquiry: ['$state', '$stateParams', services.fanhuaService.serviceName, ($state, $stateParams, fanhuaService: services.fanhuaService.Service) => fanhuaService.getInquiry($stateParams.inquiry_id)]
      }
    })
    .state('order.fanhua.detail', {
      url: '/detail?provider_id',
      views: {
        "@order": {
          templateUrl: 'features/order/result/fanhua/fanhua-detail.html',
          controller: fanhuaDetailController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
