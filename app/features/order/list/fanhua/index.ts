/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');

import inquiriesController = require('./inquiries-controller');

export let load = (app: angular.IModule) => {
  app.controller(inquiriesController.controllerName, inquiriesController.Controller);
};

export let states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('inquiry3', {
      abstract: true,
      url: '/inquiry3',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('inquiry3.list', {
      url: '/list',
      templateUrl: 'features/order/list/fanhua/inquiries.html',
      controller: inquiriesController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [services.userService.serviceName, (userService: services.userService.Service) => userService.getProfile()],
        inquiries: ['profile', services.fanhuaService.serviceName, (profile, fanhuaService: services.fanhuaService.Service) => fanhuaService.inquiryList(profile.data.data.id)]
      }
    });

};
