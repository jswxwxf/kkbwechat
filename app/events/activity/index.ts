/// <reference path="../../../lib/app.d.ts" />

'use strict';

import oauth = require('../oauth/index');
import green = require('../green/index');
import stolen = require('../stolen/index');
import hunt = require('../hunt/index');
import hunt2 = require('../hunt2/index');
import auto = require('../auto/index');
import grade = require('../grade/index');
import compensate = require('../compensate/index');
import compensate2 = require('../compensate2/index');
import comac = require('../comac/index');
import invite = require('../invite/index');
import draw = require('../draw/index');
import delay = require('../delay/index');
import alive = require('../alive/index');
import envelope = require('../envelope/index');
import dvr = require('../dvr/index');
import tm = require('../tm/index');
import quote = require('../quote/index');
import mall = require('../mall/index');

import activityController = require('./activity-controller');

export var load = (app: angular.IModule) => {

  app.controller(activityController.controllerName, activityController.Controller);

  oauth.load(app);
  green.load(app);
  stolen.load(app);
  hunt.load(app);
  hunt2.load(app);
  auto.load(app);
  grade.load(app);
  compensate.load(app);
  compensate2.load(app);
  comac.load(app);
  invite.load(app);
  draw.load(app);
  delay.load(app);
  alive.load(app);
  envelope.load(app);
  dvr.load(app);
  tm.load(app);
  quote.load(app);
  mall.load(app);

};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('activity', {
      url: '/activity',
      templateUrl: 'features/share/activity/activity.html',
      controller: activityController.controllerName,
      controllerAs: 'ctrl'
    });

  oauth.states($stateProvider);
  green.states($stateProvider);
  stolen.states($stateProvider);
  hunt.states($stateProvider);
  hunt2.states($stateProvider);
  auto.states($stateProvider);
  grade.states($stateProvider);
  compensate.states($stateProvider);
  compensate2.states($stateProvider);
  comac.states($stateProvider);
  invite.states($stateProvider);
  draw.states($stateProvider);
  delay.states($stateProvider);
  alive.states($stateProvider);
  envelope.states($stateProvider);
  dvr.states($stateProvider);
  tm.states($stateProvider);
  quote.states($stateProvider);
  mall.states($stateProvider);

};