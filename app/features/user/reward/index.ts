/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import rewardController = require('./reward-controller');
import assessController = require('./assess-controller');

export var load = (app: angular.IModule) => {
  app.controller(rewardController.controllerName, rewardController.Controller)
    .controller(assessController.controllerName, assessController.Controller);
};

var resolveProfile = [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
  utilService.showSpinner();
  return userService.getProfile().finally(() => utilService.hideSpinner());
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.reward', {
      url: '/reward',
      templateUrl: 'features/user/reward/reward.html',
      controller: rewardController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: resolveProfile
      }
    })
    .state('user.reward.assess', {
      url: '/assess',
      views: {
        "@user": {
          templateUrl: 'features/user/reward/assess.html',
          controller: assessController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
