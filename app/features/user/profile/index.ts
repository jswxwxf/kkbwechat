/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import profileController = require('./profile-controller');
import editController = require('./edit/edit-controller');

export var load = (app: angular.IModule) => {
  app.controller(profileController.controllerName, profileController.Controller)
    .controller(editController.controllerName, editController.Controller);
};

var resolveProfile = [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
  utilService.showSpinner();
  return userService.getProfile().finally(() => utilService.hideSpinner());
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.profile', {
      cache: false,
      url: '/profile',
      templateUrl: 'features/user/profile/profile.html',
      controller: profileController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('user.profile.edit', {
      cache: false,
      url: '/edit/:page',
      views: {
        "@user": {
          templateUrl: 'features/user/profile/edit/edit.html',
          controller: editController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            profile: resolveProfile
          }
        }
      }
    })
    .state('user.profile.phone', {
      cache: false,
      url: '/phone',
      views: {
        "@user": {
          templateUrl: 'features/user/profile/edit/edit-phone.html',
          controller: editController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            profile: resolveProfile
          }
        }
      }
    });

};
