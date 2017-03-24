/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import shadowController = require('./shadow-controller');
import oauthController = require('./oauth-controller');
import tokenController = require('./token-controller');
import rvmController = require('./rvm-controller');
import rvmwController = require('./rvmw-controller');
import readController = require('./read-controller');

export var load = (app: angular.IModule) => {
  app.controller(shadowController.controllerName, shadowController.Controller)
    .controller(oauthController.controllerName, oauthController.Controller)
    .controller(tokenController.controllerName, tokenController.Controller)
    .controller(rvmController.controllerName, rvmController.Controller)
    .controller(rvmwController.controllerName, rvmwController.Controller)
    .controller(readController.controllerName, readController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('shadow', {
      url: '/shadow',
      templateUrl: 'features/welcome/oauth/shadow.html',
      controller: shadowController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('token', {
      url: '/token',
      templateUrl: 'features/welcome/oauth/token.html',
      controller: tokenController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth', {
      abstract: true,
      url: '/oauth',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('oauth.detail', {
      url: '/detail',
      templateUrl: 'features/welcome/oauth/detail.html',
      controller: oauthController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth.bind', {
      url: '/bind',
      templateUrl: 'features/welcome/oauth/bind.html',
      controller: oauthController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth.rvm', {
      url: '/rvm',
      templateUrl: 'features/welcome/oauth/rvm.html',
      controller: rvmController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth.rvmw', {
      url: '/rvmw',
      templateUrl: 'features/welcome/oauth/rvmw.html',
      controller: rvmwController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth.read', {
      url: '/read',
      templateUrl: 'features/welcome/oauth/read.html',
      controller: readController.controllerName,
      controllerAs: 'ctrl'
    });

};
