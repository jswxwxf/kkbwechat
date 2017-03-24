/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import inviteController = require('./invite-controller');

export var load = (app: angular.IModule) => {
  app.controller(inviteController.controllerName, inviteController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.invite', {
      url: '/invite',
      templateUrl: 'features/user/invite/invite.html',
      controller: inviteController.Controller,
      controllerAs: 'ctrl',
      resolve: {
        profile: [services.userService.serviceName, (userService) => userService.getProfile()],
        list: () => null
      }
    })
    .state('user.invite.list', {
      url: '/list',
      views: {
        "@user": {
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
