/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import gradeController = require('./grade-controller');
import testController = require('./test-controller');
import reportController = require('./report-controller');

export var load = (app: angular.IModule) => {
  app.controller(gradeController.controllerName, gradeController.Controller)
    .controller(testController.controllerName, testController.Controller)
    .controller(reportController.controllerName, reportController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.grade', {
      url: '/grade',
      templateUrl: 'features/user/grade/grade.html',
      controller: gradeController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        'activeCar': [ common.utilService.serviceName, services.carService.serviceName, (utilService: common.utilService.Service, carService: services.carService.Service) => {
          utilService.showSpinner();
          return carService.getActiveCar().finally(() => utilService.hideSpinner());
        } ],
        'grade': [ 'activeCar', common.utilService.serviceName, services.userService.serviceName, (activeCar, utilService: common.utilService.Service, userService: services.userService.Service) => {
          utilService.showSpinner();
          return userService.getGrade(activeCar.data.data.car_id).finally(() => utilService.hideSpinner());
        } ]
      }
    })
    .state('user.grade.test', {
      url: '/test',
      views: {
        "@user": {
          templateUrl: 'features/user/grade/test.html',
          controller: testController.controllerName,
          controllerAs: 'ctrl'
        }
      },
      resolve: {
        profile: () => null,
        result: () => null
      }
    })
    .state('user.grade.result', {
      url: '/result',
      views: {
        "@user": {
          templateUrl: 'features/user/grade/result.html',
          controller: testController.controllerName,
          controllerAs: 'ctrl'
        }
      },
      resolve: {
        profile: [ services.userService.serviceName, (userService: services.userService.Service) => userService.getProfile() ],
        result: ['$q', '$state', 'profile', services.userService.serviceName, ($q: angular.IQService, $state: angular.ui.IStateService, profile, userService: services.userService.Service) => {
          profile = profile.data.data;
          return $q((resolve, reject) => {
            userService.getAssess(profile.id).then((data: any) => {
            //userService.getAssess(64).then((data: any) => {
              resolve(data);
              var result = data.data.data;
              if (_.isEmpty(result))  setTimeout(() => $state.go('user.grade.test'), 0);
            })
          });
        }]
      }
    })
    .state('user.grade.report', {
      url: '/report?stage',
      views: {
        "@user": {
          templateUrl: (params: any) => {
            var stage = params.stage || '1';
            return `features/user/grade/report${stage}.html`;
          },
          controller: reportController.controllerName,
          controllerAs: 'ctrl'
        }
      },
      resolve: {
        activeCar: [ services.carService.serviceName, (carService: services.carService.Service) => carService.getActiveCar() ],
        report: ['$stateParams', 'activeCar', services.userService.serviceName, ($stateParams, activeCar, userService: services.userService.Service) => userService.getReport(activeCar.data.data.car_id, $stateParams.stage || 1)]
      }
    });

};
