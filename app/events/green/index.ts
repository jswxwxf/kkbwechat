/// <reference path="../../../lib/app.d.ts" />

'use strict';

import register = require('./register/index');

export var load = (app: angular.IModule) => {
  register.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('green', {
      abstract: true,
      url: '/green',
      template: '<ion-nav-view></ion-nav-view>'
    });

  register.states($stateProvider);

};
