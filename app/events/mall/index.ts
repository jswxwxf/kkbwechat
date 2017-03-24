/// <reference path="../../../lib/app.d.ts" />

'use strict';

export var load = (app: angular.IModule) => {

};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('mall', {
      url: '/mall',
      templateUrl: '../../features/dvr/mall/list.html'
    })
    .state('mall.success', {
      url: '/success',
      views: {
        "@": {
          templateUrl: '../../features/dvr/mall/success.html'
        }
      }
    });

};
