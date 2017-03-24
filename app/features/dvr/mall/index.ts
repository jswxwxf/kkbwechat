/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

export var load = (app: angular.IModule) => {

};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('mall', {
      url: '/mall',
      templateUrl: 'features/dvr/mall/list.html'
    })
    .state('mall.success', {
      url: '/success',
      views: {
        "@": {
          templateUrl: 'features/dvr/mall/success.html'
        }
      }
    });

};
