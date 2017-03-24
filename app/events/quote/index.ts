/// <reference path="../../../lib/app.d.ts" />

'use strict';

import quoteController = require('./quote-controller');

export var load = (app: angular.IModule) => {
  app.controller(quoteController.controllerName, quoteController.Controller)
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {
  
  $stateProvider
    .state('quote', {
      abstract: true,
      url: '/quote',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('quote.license', {
      url: '/license?inquiry_id&license_no',
      templateUrl: '../../features/order/inquiry/quote-license.html',
      controller: quoteController.controllerName,
      controllerAs: 'ctrl'
    });

};
