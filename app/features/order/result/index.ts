/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import fanhua = require('./fanhua/index');

import resultController = require('./result-controller');

export var load = (app: angular.IModule) => {
  app.controller(resultController.controllerName, resultController.Controller);
  fanhua.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.result', {
      url: '/result?inquiry_id',
      templateUrl: 'features/order/result/result.html',
      controller: resultController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        inquiry: ['$state', '$stateParams', services.inquiryService.serviceName, ($state, $stateParams, inquiryService: services.inquiryService.Service) => {
          return inquiryService.inquiryDetail($stateParams.inquiry_id).success((data) => {
            if (_.isEmpty(data.data)) $state.go('order.inquiry.basic');
          });
        }]
      }
    });

  fanhua.states($stateProvider);

};
