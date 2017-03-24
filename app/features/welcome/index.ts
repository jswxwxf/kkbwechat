/// <reference path="../../../lib/app.d.ts" />

'use strict';

import config = require('../../config/config');
import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import oauth = require('./oauth/index');
import intro = require('./intro/index');

export import menuController = require('./menu-controller');
export import userController = require('./user-controller')
export import welcomeController = require('./welcome-controller');

export var load = (app: angular.IModule) => {
  oauth.load(app);
  intro.load(app);
  app.controller(menuController.controllerName, menuController.Controller)
    .controller(userController.controllerName, userController.Controller)
    .controller(welcomeController.controllerName, welcomeController.Controller);
};

var checkLogin = ['$q', '$state', '$timeout', services.userService.serviceName, ($q: angular.IQService, $state, $timeout, userService) => {
  if (userService.isLoggedIn()) {
    $timeout(() => $state.go('welcome'));
    return $q.reject({ code: enums.errors.Errors.AlreadyLoggedIn, error: '已有登录用户' });
  }
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {


  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: config.Config.welcomePage,
      controller: welcomeController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: [common.utilService.serviceName, services.userService.serviceName, (utilService: common.utilService.Service, userService: services.userService.Service) => {
          if (!userService.isLoggedIn()) return null;
          utilService.showSpinner();
          return userService.getProfile().catch(() => userService.deleteToken()).finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'features/welcome/login.html',
      controller: userController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        loggedIn: checkLogin
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'features/welcome/signup.html',
      controller: userController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        loggedIn: checkLogin
      }
    })
    .state('forget', {
      url: '/forget',
      templateUrl: 'features/welcome/forget.html',
      controller: userController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        loggedIn: checkLogin
      }
    });

  oauth.states($stateProvider);
  intro.states($stateProvider);

};
