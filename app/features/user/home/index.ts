/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import profileController = require('../profile/profile-controller');

export var load = (app: angular.IModule) => {
  
};


export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.home', {
      url: '/home',
      templateUrl: 'features/user/home/home.html',
      controller: profileController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
          utilService.showSpinner();
          return userService.getProfile().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.checkin', {
      url: '/checkin',
      templateUrl: 'features/user/home/checkin.html',
      controller: profileController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
          utilService.showSpinner();
          return userService.getProfile().finally(() => utilService.hideSpinner());
        }]
      }
    });;

};
