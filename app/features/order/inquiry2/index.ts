/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import inquiryController = require('./inquiry-controller');

export var load = (app: angular.IModule) => {
  app.controller(inquiryController.controllerName, inquiryController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.inquiry2', {
      abstract: true,
      url: '/inquiry2',
      template: '<ion-nav-view></ion-nav-view>',
      controller: inquiryController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        data: ['$q', common.utilService.serviceName, services.commonService.serviceName, services.userService.serviceName, ($q: angular.IQService, utilService, commonService) => {
          utilService.showSpinner();
          return $q.all({
            cities: commonService.getInquiryCities()
          }).finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('order.inquiry2.basic', {
      url: '/basic',
      templateUrl: 'features/order/inquiry2/inquiry-basic.html',
    })
    .state('order.inquiry2.more', {
      url: '/more',
      templateUrl: 'features/order/inquiry2/inquiry-more.html',
    })
    .state('order.inquiry2.insurance', {
      url: '/insurance',
      templateUrl: 'features/order/inquiry2/inquiry-insurance.html',
    })
    .state('order.inquiry2.result', {
      url: '/result',
      templateUrl: 'features/order/inquiry2/inquiry-result.html',
    });
};
