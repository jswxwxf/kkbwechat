/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import config = require('../../../config/config');

import chooseController = require('./choose-controller');

export var load = (app: angular.IModule) => {
  app.controller(chooseController.controllerName, chooseController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.product', {
      url: '/product',
      templateUrl: config.Config.productPage
    })
    .state('insurance.product.choose', {
      url: '/choose',
      views: {
        "@insurance": {
          templateUrl: 'features/insurance/product/choose.html',
          controller: chooseController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    });

};
