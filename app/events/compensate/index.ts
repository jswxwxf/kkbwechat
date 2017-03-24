/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import compensateController = require('./compensate-controller');

export var load = (app: angular.IModule) => {
  app.controller(compensateController.controllerName, compensateController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('compensate', {
      abstract: true,
      url: '/compensate',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('compensate.register', {
      url: '/register',
      templateUrl: '../../features/insurance/compensate/compensate.html',
      controller: compensateController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        total: [services.insuranceService.serviceName, (insuranceService: services.insuranceService.Service) => insuranceService.getTotalCompensate()],
      }
    })
    .state('compensate.success', {
      url: '/success',
      templateUrl: 'events/compensate/success.html',
    });

};
