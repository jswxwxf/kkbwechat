/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import register = require('../../../features/share/register/index')

export var load = (app: angular.IModule) => {
  //app.controller(registerController.controllerName, registerController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('green.register', {
      url: '/register',
      templateUrl: 'events/green/register/register.html',
      controller: register.registerController.controllerName,
      controllerAs: 'ctrl'
    });

};
