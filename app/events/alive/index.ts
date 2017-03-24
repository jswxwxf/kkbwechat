/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');

// import detailController = require('./detail-controller');

export var load = (app: angular.IModule) => {
  // app.controller(detailController.controllerName, detailController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('alive', {
      url: '/alive',
      templateUrl: 'events/alive/alive.html'
    })
    .state('alive.huawei', {
      url: '/huawei',
      views: {
        'huawei-tab': {
          templateUrl: 'events/alive/huawei.html',
        }
      }
    })
    .state('alive.meizu', {
      url: '/meizu',
      views: {
        'meizu-tab': {
          templateUrl: 'events/alive/meizu.html',
        }
      }
    })
    .state('alive.samsung', {
      url: '/samsung',
      views: {
        'samsung-tab': {
          templateUrl: 'events/alive/samsung.html',
        }
      }
    })
    .state('alive.mi', {
      url: '/mi',
      views: {
        'mi-tab': {
          templateUrl: 'events/alive/mi.html',
        }
      }
    });


};
