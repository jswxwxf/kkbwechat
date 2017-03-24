/// <reference path="../../../lib/app.d.ts" />

'use strict';

import register = require('./register/index');
import order = require('./order/index');
import draw = require('./draw/index');
import activity = require('./activity/index');
import coming = require('./coming/index');

export var load = (app: angular.IModule) => {
  register.load(app);
  order.load(app);
  draw.load(app);
  activity.load(app);
  coming.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('share', {
      abstract: true,
      url: '/share',
      template: '<ion-nav-view></ion-nav-view>',
    });

  draw.states($stateProvider);
  activity.states($stateProvider);
  coming.states($stateProvider);

};