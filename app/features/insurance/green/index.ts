/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import register = require('../../share/register/index')

//import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  //app.controller(registerController.controllerName, registerController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.green', {
      url: '/green',
      templateUrl: 'features/insurance/green/green.html'
    })
    .state('insurance.green.register', {
      url: '/register',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/green/register.html',
          controller: register.registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
