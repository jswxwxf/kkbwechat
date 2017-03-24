/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  app.controller(registerController.controllerName, registerController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.auto', {
      url: '/auto',
      templateUrl: 'features/insurance/auto/auto.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('insurance.auto.register', {
      url: '/register',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/auto/register.html',
          controller: registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
