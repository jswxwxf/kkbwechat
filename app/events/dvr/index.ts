/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import dvrController = require('./dvr-controller');
import tripController = require('./trip-controller');
import behaviorController = require('./behavior-controller');
import reportController = require('./report-controller');
import earningController = require('./earning-controller');
import {utilService} from "../../utility/index";

import task = require('./task/index');

export var load = (app: angular.IModule) => {
  app.controller(dvrController.controllerName, dvrController.Controller)
    .controller(tripController.controllerName, tripController.Controller)
    .controller(behaviorController.controllerName, behaviorController.Controller)
    .controller(reportController.controllerName, reportController.Controller)
    .controller(earningController.controllerName, earningController.Controller);
  task.load(app);
};

var checkToken = ['$location', common.utilService.serviceName, services.userService.serviceName, ($location, utilService: common.utilService.Service, userService: services.userService.Service) => {
  $location.search($location.search().from, 1);
  var token = $location.search().token;
  if (!token) return;
  userService.checkShadowToken(token, { tokenHandler: () => utilService.handleLogin() }).then(data => {
    userService.loginSSOSync({ token });
    $location.search('token', null);
  });
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('dvr', {
      abstract: true,
      url: '/dvr?from&brand&imei&token&rvm',
      templateUrl: '../../features/dvr/dvr.html',
      resolve: {
        check: checkToken
      }
    })
    .state('dvr.trip', {
      url: '/trip',
      views: {
        'trip-tab': {
          templateUrl: '../../features/dvr/trip.html',
          controller: tripController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr.behavior', {
      url: '/behavior',
      views: {
        'behavior-tab': {
          templateUrl: '../../features/dvr/behavior.html',
          controller: behaviorController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr.report', {
      url: '/report',
      views: {
        'report-tab': {
          templateUrl: '../../features/dvr/report.html',
          controller: reportController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            report: ['$stateParams', common.utilService.serviceName, services.dvrService.serviceName, ($stateParams, utilService: common.utilService.Service, dvrService: services.dvrService.Service) => {
              utilService.showSpinner();
              return dvrService.getLatestReport($stateParams).finally(() => utilService.hideSpinner());
            }]
          }
        }
      }
    })
    .state('dvr.order', {
      url: '/order',
      views: {
        '@': {
          templateUrl: '../../features/dvr/order.html'
        }
      }
    });

  $stateProvider
    .state('dvr2', {
      abstract: true,
      url: '/dvr2?from&brand&imei&token&rvm&source',
      templateUrl: '../../features/dvr/dvr2.html',
      controller: dvrController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        check: checkToken
      }
    })
    .state('dvr2.trip', {
      url: '/trip',
      views: {
        'trip-tab': {
          templateUrl: '../../features/dvr/trip.html',
          controller: tripController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr2.behavior', {
      url: '/behavior',
      views: {
        'behavior-tab': {
          templateUrl: '../../features/dvr/behavior.html',
          controller: behaviorController.controllerName,
          controllerAs: 'ctrl'
        }
      }
    })
    .state('dvr2.report', {
      url: '/report',
      views: {
        'report-tab': {
          templateUrl: '../../features/dvr/report.html',
          controller: reportController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            report: ['$stateParams', common.utilService.serviceName, services.dvrService.serviceName, ($stateParams, utilService: common.utilService.Service, dvrService: services.dvrService.Service) => {
              utilService.showSpinner();
              return dvrService.getLatestReport($stateParams).finally(() => utilService.hideSpinner());
            }]
          }
        }
      }
    })
    .state('dvr2.earning', {
      url: '/earning',
      views: {
        'earning-tab': {
          templateUrl: '../../features/dvr/earning.html',
          controller: earningController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            credits: ['$stateParams', common.utilService.serviceName, services.dvrService.serviceName, ($stateParams, utilService: common.utilService.Service, dvrService: services.dvrService.Service) => {
              utilService.showSpinner();
              return dvrService.getCredits($stateParams).finally(() => utilService.hideSpinner());
            }]
          }
        }
      }
    })
    .state('dvr2.order', {
      url: '/order',
      views: {
        '@': {
          templateUrl: '../../features/dvr/order.html'
        }
      }
    })
    .state('dvr2-error', {
      url: '/dvr2-error',
      templateUrl: '../../features/dvr/error.html'
    });

  task.states($stateProvider);

};
