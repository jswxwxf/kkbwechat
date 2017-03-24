/// <reference path="../../../lib/app.d.ts" />

'use strict';

import result = require('./result/index');

export var load = (app: angular.IModule) => {
  result.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('grade', {
      abstract: true,
      url: '/grade',
      template: '<ion-nav-view></ion-nav-view>'
    });

  result.states($stateProvider);

};
