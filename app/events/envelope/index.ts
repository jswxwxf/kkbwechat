/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import {Config} from "../../config/config";

import baseController = require('./base-controller');
import entryController = require('./entry-controller');
import drawController = require('./draw-controller');
import successController = require('./success-controller');
import activeController = require('./active-controller');
import activatedController = require('./activated-controller');
import listController = require('./list-controller');

export var load = (app: angular.IModule) => {
  app.controller(baseController.controllerName, baseController.Controller)
    .controller(entryController.controllerName, entryController.Controller)
    .controller(drawController.controllerName, drawController.Controller)
    .controller(successController.controllerName, successController.Controller)
    .controller(activeController.controllerName, activeController.Controller)
    .controller(activatedController.controllerName, activatedController.Controller)
    .controller(listController.controllerName, listController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('envelope', {
      abstract: true,
      url: '/envelope?openid&source',
      templateUrl: 'events/envelope/base.html',
      controller: baseController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        source: ['$stateParams', ($stateParams) => {
          if (!$stateParams.source) $stateParams.source = 'kkb';
          return $stateParams.source;
        }],
        openid: ['$q', '$stateParams', services.wechatService.serviceName, ($q, $stateParams, wechatService: services.wechatService.Service) => {
          return $q((resolve, reject) => {
            // if (!Config.inWechat()) return resolve('testopenid2');
            if (!$stateParams.openid) return wechatService.redirectForOpenIdEx('/envelope/entry');
            if (angular.isArray($stateParams.openid)) return resolve($stateParams.openid[0]);
            resolve($stateParams.openid);
          });
        }],
        check: ['$q', '$state', '$location', 'openid', common.utilService.serviceName, services.eventsService.serviceName, ($q, $state, $location, openid, utilService: common.utilService.Service, eventsService: services.eventsService.Service) => {
          return $q((resolve, reject) => {
            if (_.includes(['/envelope/list'], $location.path())) return resolve();
            eventsService.envelopeInfo(openid).success((data) => {
              var result = data.data;
              // alert(angular.toJson(result));
              // 有当前活动红包
              if (parseInt(result.rp_id)) {
                if (result.rp_status == 1) return resolve(utilService.replaceUrl(`/envelopew/activated?openid=${openid}&envelope=${result.rp_id}`));    // 当前活动红包已激活
                return resolve(utilService.replaceState('envelope.success', { envelope: result.rp_id }));   // 当前活动红包还需助力
              }
              // 当前没有活动红包
              if (parseInt(result.pp_id)) return resolve(utilService.replaceState('envelope.destroy'));     // 但之前有焚毁红包
              // 今天用户还没有抽到过红包
              resolve(utilService.replaceState('envelope.entry'));
            });
          });
        }]
      }
    })
    .state('envelope.entry', {
      url: '/entry',
      templateUrl: 'events/envelope/entry.html',
      controller: entryController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        envelope: ['$q', 'openid', services.eventsService.serviceName, ($q, openid, eventsService: services.eventsService.Service) => eventsService.envelopeInfo(openid)]
      }
    })
    .state('envelope.draw', {
      url: '/draw',
      templateUrl: 'events/envelope/draw.html',
      controller: drawController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('envelope.success', {
      url: '/success?envelope',
      templateUrl: 'events/envelope/success.html',
      controller: successController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        detail: ['$stateParams', services.eventsService.serviceName, ($stateParams, eventsService: services.eventsService.Service) => eventsService.envelopeDetail($stateParams.envelope)]
      }
    })
    .state('envelope.destroy', {
      url: '/destroy',
      templateUrl: 'events/envelope/destroy.html'
    })
    .state('envelope.list', {
      url: '/list',
      templateUrl: 'events/envelope/list.html',
      controller: listController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        list: ['openid', services.eventsService.serviceName, (openid, eventsService: services.eventsService.Service) => eventsService.envelopeList(openid)]
      }
    });

  $stateProvider
    .state('envelopew', {
      abstract: true,
      url: '/envelopew?openid&envelope&source',
      templateUrl: 'events/envelope/base.html',
      resolve: {
        source: ['$stateParams', ($stateParams) => {
          if (!$stateParams.source) $stateParams.source = 'kkb';
          return $stateParams.source;
        }],
        openid: ['$q', '$location', '$stateParams', services.wechatService.serviceName, ($q, $location, $stateParams, wechatService: services.wechatService.Service) => {
          return $q((resolve, reject) => {
            // if (!Config.inWechat()) return resolve('testhelperid6');
            if (!$stateParams.openid) return wechatService.redirectForOpenIdEx($location.path());
            if (angular.isArray($stateParams.openid)) return resolve($stateParams.openid[0]);
            resolve($stateParams.openid);
          });
        }],
        envelope: ['$stateParams', ($stateParams) => $stateParams.envelope],
        detail: ['envelope', services.eventsService.serviceName, (envelope, eventsService: services.eventsService.Service) => eventsService.envelopeDetail(envelope)],
        check: ['$q', '$state', 'openid', 'detail', common.utilService.serviceName, ($q, $state, openid, detail, utilService: common.utilService.Service) => {
          var detail = detail.data.data;
          // alert(angular.toJson(detail));
          return $q((resolve, reject) => {
            // 红包已激活
            if (detail.rp_status == 1) {
              // 激活的红包被本人打开
              if (openid == detail.openid) return resolve(utilService.replaceState('envelopew.activated'));
              // 激活的红包被其他人打开
              return resolve(utilService.replaceState('envelopew.share'));
            }
            // 红包待激活 或 已失效
            resolve(utilService.replaceState('envelopew.active'));
          });
        }]
      }
    })
    .state('envelopew.active', {
      url: '/active',
      templateUrl: 'events/envelope/active.html',
      controller: activeController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('envelopew.activated', {
      url: '/activated',
      templateUrl: 'events/envelope/activated.html',
      controller: activatedController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('envelopew.share', {
      url: '/share',
      templateUrl: 'events/envelope/share.html',
      controller: activeController.controllerName,
      controllerAs: 'ctrl'
    });

};
