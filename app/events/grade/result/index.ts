/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import services = require('../../../components/services/index');

import resultController = require('./result-controller');
import reportController = require('./report-controller');
import recallController = require('./recall-controller');

export var load = (app: angular.IModule) => {
  app.controller(resultController.controllerName, resultController.Controller)
    .controller(reportController.controllerName, reportController.Controller)
    .controller(recallController.controllerName, recallController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('grade.result', {
      url: '/result?userId',
      templateUrl: '../../features/user/grade/result.html',
      controller: resultController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: ['$stateParams', ($stateParams) => {
          var data = {};
          data['data'] = {};
          data['data']['data'] = { id: $stateParams.userId };
          return data;
        }],
        result: ['$stateParams', services.userService.serviceName, ($stateParams, userService: services.userService.Service) => userService.getAssess($stateParams.userId)]
      }
    })
    .state('grade.report', {
      url: '/report?carId&stage',
      templateUrl: (params: any) => {
        var stage = params.stage || '1';
        return `../../features/user/grade/report${stage}.html`;
      },
      controller: reportController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        activeCar: ['$stateParams', ($stateParams) => {
          var data = {};
          data['data'] = {};
          data['data']['data'] = { car_id: $stateParams.carId };
          return data;
        }],
        report: ['$stateParams', services.userService.serviceName, ($stateParams, userService: services.userService.Service) => userService.getReport($stateParams.carId, $stateParams.stage || 1)]
      }
    })
    .state('grade.recall', {
      url: '/recall?carId',
      templateUrl: 'events/grade/result/recall.html',
      controller: recallController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        agreement: ['$stateParams', services.userService.serviceName, ($stateParams, userService: services.userService.Service) => userService.getAgreement($stateParams.carId)]
      }
    });

};
