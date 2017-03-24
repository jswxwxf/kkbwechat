/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');

import fanhuaController = require('./fanhua-controller');

export let load = (app: angular.IModule) => {
  app.controller(fanhuaController.controllerName, fanhuaController.Controller);
};

export let states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.fanhua.pay', {
      url: '/pay?provider_id',
      views: {
        "@order": {
          templateUrl: 'features/order/payment/fanhua/fanhua.html',
          controller: fanhuaController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
