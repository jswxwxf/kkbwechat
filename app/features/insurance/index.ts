/// <reference path="../../../lib/app.d.ts" />

'use strict';

import compensate = require('./compensate/index');
import compensate2 = require('./compensate2/index');
import lcb = require('./lcb/index');
import green = require('./green/index');
import auto = require('./auto/index');
import hunt = require('./hunt/index');
import delay = require('./delay/index');
import product = require('./product/index');
import preeval = require('./eval/index');
import intro = require('./intro/index');

export var load = (app: angular.IModule) => {
  compensate.load(app);
  compensate2.load(app);
  lcb.load(app);
  green.load(app);
  auto.load(app);
  hunt.load(app);
  delay.load(app);
  product.load(app);
  preeval.load(app);
  intro.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('insurance', {
      abstract: true,
      url: '/insurance',
      template: '<ion-nav-view></ion-nav-view>'
    });

  compensate.states($stateProvider);
  compensate2.states($stateProvider);
  lcb.states($stateProvider);
  green.states($stateProvider);
  auto.states($stateProvider);
  hunt.states($stateProvider);
  delay.states($stateProvider);
  product.states($stateProvider);
  preeval.states($stateProvider);
  intro.states($stateProvider);

};
