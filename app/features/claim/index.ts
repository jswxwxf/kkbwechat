/// <reference path="../../../lib/app.d.ts" />

'use strict';

import compensate = require('./compensate/index');
import compensate2 = require('./compensate2/index');
import lcb = require('./lcb/index');
import list = require('./list/index');

export var load = (app: angular.IModule) => {
  compensate.load(app);
  compensate2.load(app);
  lcb.load(app);
  list.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('claim', {
      abstract: true,
      url: '/claim',
      template: '<ion-nav-view></ion-nav-view>'
    });

  compensate.states($stateProvider);
  compensate2.states($stateProvider);
  lcb.states($stateProvider);
  list.states($stateProvider);

}
