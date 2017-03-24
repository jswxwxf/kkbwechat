/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import listController = require('./list-controller');

export var load = (app: angular.IModule) => {
  app.controller(listController.controllerName, listController.Controller);
};

var checkToken = ['$location', '$state', common.utilService.serviceName, services.userService.serviceName, services.deviceService.serviceName, ($location, $state, utilService: common.utilService.Service, userService: services.userService.Service, deviceService: services.deviceService.Service) => {
  var token = $location.search().token;
  if (!token) return;
  userService.checkShadowToken(token, { tokenHandler: () => utilService.handleLogin() });
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('read', {
      abstract: true,
      url: '/read',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('read.intro', {
      url: '/intro',
      templateUrl: 'features/dvr/read/intro.html'
    })
    .state('read.follow', {
      url: '/follow?token&read&complete',
      templateUrl: 'features/dvr/read/follow.html',
      controller: ['$scope', '$location', ($scope, $location) => {
        $scope.complete = $location.search().complete;
      }],
      resolve: {
        check: checkToken
      }
    })
    .state('read.bind', {
      url: '/bind',
      templateUrl: 'features/dvr/read/bind.html'
    })
    .state('read.list', {
      url: '/list',
      templateUrl: 'features/dvr/read/list.html',
      controller: listController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        devices: ['$state', services.deviceService.serviceName, ($state, deviceService: services.deviceService.Service) => {
          return deviceService.getDevices().then(resp => {
            var hasDevice = resp.data.data.length > 0;
            if (!hasDevice) {
              $state.go('read.bind', { location: 'replace' });
            }
          });
        }]
      }
    });

};
