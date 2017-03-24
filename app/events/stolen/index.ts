/// <reference path="../../../lib/app.d.ts" />

'use strict';

import stolenController = require('./stolen-controller');

export var load = (app: angular.IModule) => {
  app.controller(stolenController.controllerName, stolenController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('stolen', {
      abstract: true,
      url: '/stolen?source&openid',
      template: '<ion-nav-view></ion-nav-view><div id="lcb-stolen-bgm"><img src="static/images/sound_01.png" ng-click="ctrl.toggleBGM()" ng-show="!ctrl.bgmusic.paused"><img src="static/images/sound_02.png" ng-click="ctrl.toggleBGM()" ng-show="ctrl.bgmusic.paused"></div>',
      controller: stolenController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('stolen.intro', {
      url: '/intro',
      templateUrl: 'events/stolen/intro.html'
    })
    .state('stolen.apply', {
      url: '/apply',
      templateUrl: 'events/stolen/apply.html'
    })
    .state('stolen.success', {
      url: '/success',
      templateUrl: (params: any) => {
        var sourceWeixin = _.startsWith(params.source, 'W');
        return sourceWeixin ? 'events/stolen/wsuccess.html' : 'events/stolen/asuccess.html';
      }
    });

};
