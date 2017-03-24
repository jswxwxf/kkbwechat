/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');
import {Config} from "../../config/config";

import hunt2Controller = require('./hunt2-controller');
import deliverController = require('./deliver-controller');
import registerController = require('./register-controller');
import successController = require('./success-controller');
import selfieController = require('./selfie-controller');
import foolsController = require('./fools-controller');

export var load = (app: angular.IModule) => {
  app.controller(hunt2Controller.controllerName, hunt2Controller.Controller)
    .controller(deliverController.controllerName, deliverController.Controller)
    .controller(registerController.controllerName, registerController.Controller)
    .controller(successController.controllerName, successController.Controller)
    .controller(selfieController.controllerName, selfieController.Controller)
    .controller(foolsController.controllerName, foolsController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('hunt2fools', {
      url: '/hunt2fools',
      templateUrl: 'events/hunt2/fools.html',
      controller: foolsController.controllerName,
      controllerAs: 'ctrl'
    });
  
  $stateProvider
    .state('hunt2', {
      abstract: true,
      url: '/hunt2?openid?source',    // source = yd | db | kkb (default)
      template: '<ion-nav-view></ion-nav-view>',
      controller: hunt2Controller.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        source: ['$stateParams', ($stateParams) => {
          if (!$stateParams.source) $stateParams.source = 'kkb';
          return $stateParams.source;
        }],
        openid: ['$stateParams', services.wechatService.serviceName, ($stateParams, wechatService: services.wechatService.Service) => {
          if (!Config.inWechat()) return 'id' + _.random(0, (new Date()).getTime());
          var redirectUri = location.origin + location.pathname + '#/hunt2/splash';
          var queryStr = location.href.split('?')[1];
          if (queryStr) redirectUri += '?' + queryStr;
          if (!$stateParams.openid) return wechatService.redirectForOpenId(redirectUri);
          return $stateParams.openid;
        }],
        order: ['openid', services.eventsService.serviceName, (openid, eventsService: services.eventsService.Service) => {
          return eventsService.getHunt2Order(openid);
        }]
      },
      onEnter: [ '$location', '$state', '$stateParams', ($location, $state: angular.ui.IStateService, $stateParams) => {
        if ($location.path() == '/hunt2/splash') return;
        setTimeout(() => $state.go('hunt2.splash', $stateParams, { location: 'replace' }), 0);
      }]
    })
    .state('hunt2.splash', {
      url: '/splash',
      templateUrl: 'events/hunt2/splash.html',
      controller: hunt2Controller.controllerName,
      controllerAs: 'ctrl',
      onEnter: [ '$state', '$stateParams', 'order', ($state: angular.ui.IStateService, $stateParams, order) => {
        order = order.data.data;
        var nextPage = 'hunt2.ad';
        if ((order.beauty_id || 0) != 0) nextPage = 'hunt2.success';
        setTimeout(() => $state.go(nextPage, $stateParams, { location: 'replace' }), 2000);
      }]
    })
    .state('hunt2.ad', {
      url: '/ad',
      templateUrl: 'events/hunt2/ad.html',
      controller: hunt2Controller.controllerName,
      controllerAs: 'ctrl',
      onEnter: [ '$state', '$stateParams', 'order', ($state: angular.ui.IStateService, $stateParams, order) => {
        order = order.data.data;
        var nextPage = 'hunt2.intro';
        if ((order.beauty_id || 0) != 0) nextPage = 'hunt2.success';
        //if (!order.mobile) nextPage = 'hunt2.register';
        setTimeout(() => $state.go(nextPage, $stateParams, { location: 'replace' }), 5000);
      }]
    })
    .state('hunt2.intro', {
      url: '/intro',
      templateUrl: 'events/hunt2/intro.html',
      controller: hunt2Controller.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt2.deliver', {
      url: '/deliver',
      templateUrl: 'events/hunt2/deliver.html',
      controller: deliverController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt2.register', {
      url: '/register',
      templateUrl: 'events/hunt2/register.html',
      controller: registerController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt2.success', {
      url: '/success',
      templateUrl: 'events/hunt2/success.html',
      controller: successController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        detail: [ 'openid', services.eventsService.serviceName, (openid, eventsService: services.eventsService.Service) => {
          return eventsService.getHunt2Order(openid);
        }]
      }
    })
    .state('hunt2.ignore', {
      url: '/ignore',
      templateUrl: 'events/hunt2/ignore.html',
      controller: hunt2Controller.controllerName,
      controllerAs: 'ctrl'
    })
    .state('hunt2.selfie', {
      url: '/selfie',
      templateUrl: 'events/hunt2/selfie.html',
      controller: selfieController.controllerName,
      controllerAs: 'ctrl'
    });

};
