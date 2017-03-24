/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import config = require('../../../config/config');
import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import talkController = require('./talk-controller');

export var load = (app: angular.IModule) => {
  app.controller(talkController.controllerName, talkController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('video', {
      url: '/video',
      templateUrl: 'features/welcome/intro/video.html'
    })
    .state('talk', {
      url: '/talk?topic?full',
      templateUrl: 'features/welcome/intro/talk.html',
      controller: talkController.controllerName,
      controllerAs: 'ctrl'
    });

};
