/// <reference path="../../../lib/app.d.ts" />

'use strict';

import compensate = require('./compensate/index');
import compensate2 = require('./compensate2/index');
import stolen = require('./stolen/index');
import lcb = require('./lcb/index');
import list = require('./list/index');
import payment = require('./payment/index');
import inquiry = require('./inquiry/index');
import inquiry2 = require('./inquiry2/index');
import inquiry3 = require('./inquiry3/index');
import result = require('./result/index');

export var load = (app: angular.IModule) => {
  compensate.load(app);
  compensate2.load(app);
  stolen.load(app);
  lcb.load(app);
  list.load(app);
  payment.load(app);
  inquiry.load(app);
  inquiry2.load(app);
  inquiry3.load(app);
  result.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('order', {
      abstract: true,
      url: '/order',
      template: '<ion-nav-view></ion-nav-view>'
    });

  compensate.states($stateProvider);
  compensate2.states($stateProvider);
  stolen.states($stateProvider);
  lcb.states($stateProvider);
  list.states($stateProvider);
  payment.states($stateProvider);
  inquiry.states($stateProvider);
  inquiry2.states($stateProvider);
  inquiry3.states($stateProvider);
  result.states($stateProvider);

};
