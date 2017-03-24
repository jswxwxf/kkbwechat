/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {Utils} from "../../../utility/index";

import inquiryController = require('./inquiry-controller');

export var load = (app: angular.IModule) => {
  app.controller(inquiryController.controllerName, inquiryController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.inquiry3', {
      abstract: true,
      url: '/inquiry3?areaCode&inquiry_id',
      template: '<ion-nav-view></ion-nav-view>',
      controller: inquiryController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [services.userService.serviceName, (userService: services.userService.Service) => userService.getProfile()]
      },
      onEnter: [ '$location', '$state', '$stateParams', ($location, $state: angular.ui.IStateService, $stateParams) => {
        if ($location.path() == '/order/inquiry3/basic') return;
        setTimeout(() => $state.go('order.inquiry3.basic'), 0);
      }]
    })
    .state('order.inquiry3.basic', {
      url: '/basic',
      templateUrl: 'features/order/inquiry3/inquiry-basic.html'
    })
    .state('order.inquiry3.more', {
      url: '/more',
      templateUrl: 'features/order/inquiry3/inquiry-more.html'
    })
    .state('order.inquiry3.insurance', {
      url: '/insurance',
      templateUrl: 'features/order/inquiry3/inquiry-insurance.html'
    })

};
