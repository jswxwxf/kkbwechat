/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import shopController = require('./shop-controller');

export var load = (app: angular.IModule) => {
  app.controller(shopController.controllerName, shopController.Controller);
};


export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.shop', {
      url: '/shop',
      templateUrl: 'features/user/shop/shop.html',
      controller: shopController.controllerName,
      controllerAs: 'ctrl'
    });

};
