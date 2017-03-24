/// <reference path="../lib/app.d.ts" />

'use strict';

var app = angular.module('lcbapp', [
  'ionic',
  'ngAnimate', 'ngMessages', 'ngCookies', 'ngStorage', 'ngTouch', 'ngAudio',
  'angular-cache', 'angular-progress-arc', 'ionic-toast',
  'ionic.wizard', 'ionic.rating',
  'ui.validate',
  'naif.base64',
  'tc.chartjs',
  'angulartics', 'angulartics.baidu', 'angulartics.piwik'
]);

import {Config} from './config/config';

import common = require('./utility/index'); common.load(app);
import directives = require('./components/directives/index'); directives.load(app);
import components = require('./components/components/index'); components.load(app);
import filters = require('./components/filters/index'); filters.load(app);
import services = require('./components/services/index'); services.load(app);
import enums = require('./enums/index');

/* features */
import share = require('./features/share/index'); share.load(app);
import welcome = require('./events/welcome/index'); welcome.load(app);
import activity = require('./events/activity/index'); activity.load(app);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', ($locationProvider, $stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {

  //$locationProvider.html5Mode(true);

  welcome.states($stateProvider);
  activity.states($stateProvider);

}]).run(['$rootScope', '$window', '$location', common.storeService.serviceName, services.jsBridgeService.serviceName, common.utilService.serviceName, services.userService.serviceName, ($rootScope, $window, $location, storeService: common.storeService.Service, jsBridgeService: services.jsBridgeService.Service, utilService: common.utilService.Service, userService: services.userService.Service) => {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    utilService.rememberState(toState, toParams);
    jsBridgeService.reset();
  });

  Config.launchOptions = $location.search();
  // token 可能从外部直接传递进来, 所以需要用外部的 token 代替现有
  if ($location.search().token && userService.isLoggedIn()) userService.logoutSync();
  Config._inEvent = true;
  $rootScope.lcbConfig = Config;

}]);

