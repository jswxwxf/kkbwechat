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
import welcome = require('./features/welcome/index'); welcome.load(app);
import user = require('./features/user/index'); user.load(app);
import dvr = require('./features/dvr/index'); dvr.load(app);
import insurance = require('./features/insurance/index'); insurance.load(app);
import claim = require('./features/claim/index'); claim.load(app);
import order = require('./features/order/index'); order.load(app);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', ($locationProvider: angular.ILocationProvider, $stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {

  //$locationProvider.html5Mode(true);

  share.states($stateProvider);
  welcome.states($stateProvider);
  user.states($stateProvider);
  dvr.states($stateProvider);
  insurance.states($stateProvider);
  claim.states($stateProvider);
  order.states($stateProvider);

  $urlRouterProvider.otherwise('/welcome');
  
}]).run(['$rootScope', '$window', '$location', '$ionicHistory', common.storeService.serviceName, common.utilService.serviceName, services.userService.serviceName, ($rootScope, $window, $location, $ionicHistory, storeService: common.storeService.Service,  utilService: common.utilService.Service, userService: services.userService.Service) => {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    utilService.rememberState(toState, toParams);
  });

  Config.launchOptions = $location.search();
  // token 可能从外部直接传递进来, 所以需要用外部的 token 代替现有
  if ($location.search().token && userService.isLoggedIn()) userService.logoutSync();
  $rootScope.lcbConfig = Config;

}]);

