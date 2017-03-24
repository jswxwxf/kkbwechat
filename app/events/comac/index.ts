/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');

import luckyDrawController = require('./luckydraw-controller');
import successController = require('./success-controller');

export var load = (app: angular.IModule) => {
  app.controller(luckyDrawController.controllerName, luckyDrawController.Controller)
    .controller(successController.controllerName, successController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('comac', {
      abstract: true,
      url: '/comac?openid',
      template: '<ion-nav-view></ion-nav-view>',
      resolve: {
        openid: ['$q', '$stateParams', services.wechatService.serviceName, ($q, $stateParams, wechatService: services.wechatService.Service) => {
          return $q((resolve, reject) => {
            //if (!Config.inWechat()) return resolve('testopenid'); // return 'id' + _.random(0, (new Date()).getTime());
            if (!$stateParams.openid) return wechatService.redirectForOpenIdEx('/comac/luckydraw');
            resolve($stateParams.openid);
          });
        }],
        device: ['openid', services.eventsService.serviceName, (openid, eventsService: services.eventsService.Service) => eventsService.comacDevice(openid)],
        check: ['$state', 'openid', services.eventsService.serviceName, ($state, openid, eventsService: services.eventsService.Service) => {
          return eventsService.isFollow(openid).then((data) => {
            if (!data.data.data.follow) {
              setTimeout(() => $state.go('comac.follow', null, { location: 'replace' }), 0);
              return 'redirected';
            }
            return eventsService.canComacDraw(openid);
          }).then((data) => {
            if (data == 'redirected') return;
            if (!data.data.data.available) setTimeout(() => $state.go('comac.success', { reward: data.data.data.result }, { location: 'replace' }), 0);
          });
        }],
        hideMenu: [services.wechatService.serviceName, (wechatService: services.wechatService.Service) => wechatService.hideAllNonBaseMenuItem()]
      }
    })
    .state('comac.follow', {
      url: '/follow',
      templateUrl: 'events/comac/follow.html'
    })
    .state('comac.luckydraw', {
      url: '/luckydraw',
      templateUrl: 'events/comac/luckydraw.html',
      controller: luckyDrawController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('comac.success', {
      url: '/success?reward',
      templateUrl: 'events/comac/success.html',
      controller: successController.controllerName,
      controllerAs: 'ctrl'
    });

};
