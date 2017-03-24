/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');

import delayController = require('./delay-controller');

export var load = (app: angular.IModule) => {
  app.controller(delayController.controllerName, delayController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('delay', {
      abstract: true,
      url: '/delay',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('delay.intro', {
      url: '/intro',
      templateUrl: 'features/insurance/delay/delay.html',
      controller: delayController.controllerName,
      controllerAs: 'ctrl'
    });

};