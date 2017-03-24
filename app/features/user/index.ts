/// <reference path="../../../lib/app.d.ts" />

'use strict';

/**
 * @ngdoc overview
 * @name helloYoApp
 * @description
 * # helloYoApp
 *
 * Main module of the application.
 */

import home = require('./home/index');
import profile = require('./profile/index');
import detail = require('./detail/index');
import wallet = require('./wallet/index');
import shop = require('./shop/index');
import travel = require('./travel/index');
import reward = require('./reward/index');
import device = require('./device/index');
import car = require('./car/index');
import grade = require('./grade/index');
import invite = require('./invite/index');
import about = require('./about/index');

export var load = (app: angular.IModule) => {
  home.load(app);
  profile.load(app);
  detail.load(app);
  wallet.load(app);
  shop.load(app);
  travel.load(app);
  reward.load(app);
  device.load(app);
  car.load(app);
  grade.load(app);
  invite.load(app);
  about.load(app);
};


export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('user', {
      abstract: true,
      url: '/user',
      template: '<ion-nav-view></ion-nav-view>'
    });

  home.states($stateProvider);
  profile.states($stateProvider);
  detail.states($stateProvider);
  wallet.states($stateProvider);
  shop.states($stateProvider);
  travel.states($stateProvider);
  reward.states($stateProvider);
  device.states($stateProvider);
  car.states($stateProvider);
  grade.states($stateProvider);
  invite.states($stateProvider);
  about.states($stateProvider);

};
