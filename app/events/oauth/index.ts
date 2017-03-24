/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import shadowController = require('./shadow-controller');
import tokenController = require('./token-controller');
import rvmwController = require('./rvmw-controller')

export var load = (app: angular.IModule) => {
  app.controller(shadowController.controllerName, shadowController.Controller)
    .controller(tokenController.controllerName, tokenController.Controller)
    .controller(rvmwController.controllerName, rvmwController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('shadow', {
      url: '/shadow?token',
      templateUrl: '../../features/welcome/oauth/shadow.html',
      controller: shadowController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('token', {
      url: '/token',
      templateUrl: '../../features/welcome/oauth/token.html',
      controller: tokenController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('oauth', {
      abstract: true,
      url: '/oauth',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('oauth.rvmw', {
      url: '/rvmw',
      templateUrl: '../../features/welcome/oauth/rvmw.html',
      controller: rvmwController.controllerName,
      controllerAs: 'ctrl'
    });

};
