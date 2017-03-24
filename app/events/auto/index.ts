/// <reference path="../../../lib/app.d.ts" />

'use strict';

import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  app.controller(registerController.controllerName, registerController.Controller)
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('auto', {
      url: '/auto',
      templateUrl: 'features/insurance/auto/auto.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('auto.register', {
      url: '/register',
      views: {
        "@": {
          templateUrl: 'features/insurance/auto/register.html',
          controller: registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
