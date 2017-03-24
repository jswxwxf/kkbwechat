/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import services = require('../../../components/services/index');

export var load = (app: angular.IModule) => {

};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('share.coming', {
      url: '/coming',
      templateUrl: 'features/share/coming/coming.html'
    });

};