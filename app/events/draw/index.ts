/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');

import scratchDrawController = require('./scratch-controller');

export var load = (app: angular.IModule) => {
  app.controller(scratchDrawController.controllerName, scratchDrawController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('draw', {
      abstract: true,
      url: '/draw',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('draw.scratch', {
      url: '/scratch',
      templateUrl: 'features/share/draw/scratch.html',
      controller: scratchDrawController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        log: [services.eventsService.serviceName, (eventsService: services.eventsService.Service) => eventsService.scratchLog()]
      }
    })
    .state('draw.scratch.history', {
      url: '/history',
      views: {
        "@draw": {
          templateUrl: 'features/share/draw/scratch-history.html',
          controller: scratchDrawController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};