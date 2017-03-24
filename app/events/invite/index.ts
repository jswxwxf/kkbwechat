/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');
import inviteController = require('./invite-controller');

export var load = (app: angular.IModule) => {
  app.controller(inviteController.controllerName, inviteController.Controller)
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('invite', {
      url: '/invite',
      templateUrl: 'features/user/invite/invite.html',
      controller: inviteController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [services.userService.serviceName, (userService) => userService.getProfile()],
        list: () => null
      }
    })
    .state('invite.list', {
      url: '/list',
      views: {
        "@": {
          templateUrl: 'features/user/invite/list.html',
          controller: inviteController.controllerName,
          controllerAs: 'ctrl'
        }
      },
      resolve: {
        profile: [services.userService.serviceName, (userService) => userService.getProfile()],
        list: [services.userService.serviceName, (userService) => userService.getInvitations()]
      }
    });

};
