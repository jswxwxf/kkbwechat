/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import delayController = require('./delay-controller');

export var load = (app: angular.IModule) => {
  app.controller(delayController.controllerName, delayController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.delay', {
      url: '/delay',
      templateUrl: 'features/insurance/delay/delay.html',
      controller: delayController.controllerName,
      controllerAs: 'ctrl'
    });

};
