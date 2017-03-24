/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import travelController = require('./travel-controller');

export var load = (app: angular.IModule) => {
  app.controller(travelController.controllerName, travelController.Controller);
};

var resolveProfile = [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
  utilService.showSpinner();
  return userService.getProfile().finally(() => utilService.hideSpinner());
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.travel', {
      url: '/travel',
      templateUrl: 'features/user/travel/travel.html',
      controller: travelController.Controller,
      controllerAs: 'ctrl',
      resolve: {
        profile: resolveProfile
      }
    });

};
