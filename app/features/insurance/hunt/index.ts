/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import register = require('../../share/register/index')

import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  app.controller(registerController.controllerName, registerController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.hunt', {
      abstract: true,
      url: '/hunt?source&refcode',
    })
    .state('insurance.hunt.ad', {
      url: '/ad',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/hunt/ad.html'
        }
      }
    })
    .state('insurance.hunt.intro', {
      url: '/intro',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/hunt/hunt.html',
          controller: registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('insurance.hunt.register', {
      url: '/register',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/hunt/register-step1.html',
          controller: registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('insurance.hunt.success', {
      url: '/success',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/hunt/register-success.html',
          controller: registerController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
