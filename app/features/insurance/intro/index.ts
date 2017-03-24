/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import register = require('../../share/register/index')

import introController = require('./intro-controller');

export var load = (app: angular.IModule) => {
  app.controller(introController.controllerName, introController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.intro', {
      url: '/intro',
      templateUrl: 'features/insurance/intro/intro.html',
      controller: introController.controllerName,
      controllerAs: 'ctrl'
    })

};
