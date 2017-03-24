/// <reference path="../../../lib/app.d.ts" />

'use strict';

import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  app.controller(registerController.controllerName, registerController.Controller)
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('hunt', {
      abstract: true,
      url: '/hunt?fromid&source&refcode',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('hunt.intro', {
      url: '/intro',
      templateUrl: '../../features/insurance/hunt/hunt.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt.register', {
      url: '/register',
      templateUrl: '../../features/insurance/hunt/register-step1.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt.success', {
      url: '/success',
      templateUrl: '../../features/insurance/hunt/register-success.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    });

};
