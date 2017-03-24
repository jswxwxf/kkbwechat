/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import services = require('../../../components/services/index');

import activityController = require('./activity-controller');

export var load = (app: angular.IModule) => {
  app.controller(activityController.controllerName, activityController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('share.activity', {
      url: '/activity',
      templateUrl: 'features/share/activity/activity.html',
      controller: activityController.controllerName,
      controllerAs: 'ctrl'
    });

};