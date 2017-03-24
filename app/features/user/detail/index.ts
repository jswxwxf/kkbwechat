/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import detailController = require('./detail-controller');

export var load = (app: angular.IModule) => {
  app.controller(detailController.controllerName, detailController.Controller);
};

var resolveProfile = [common.utilService.serviceName, services.userService.serviceName, (utilService, userService) => {
  utilService.showSpinner();
  return userService.getProfile().finally(() => utilService.hideSpinner());
}];

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.detail', {
      abstract: true,
      url: '/detail',
      templateUrl: 'features/user/detail/detail.html',
      controller: detailController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        profile: resolveProfile
      }
    })
    .state('user.detail.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'features/user/detail/home.html',
        }
      }
    })
    .state('user.detail.drive', {
      url: '/drive',
      views: {
        'drive-tab': {
          templateUrl: 'features/user/detail/drive.html',
          controller: detailController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            profile: resolveProfile
          }
        }
      }
    })
    .state('user.detail.credit', {
      url: '/credit',
      views: {
        'credit-tab': {
          templateUrl: 'features/user/detail/credit.html',
          controller: detailController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            profile: resolveProfile
          }
        }
      }
    })
    .state('user.detail.jobedu', {
      url: '/jobedu',
      views: {
        'jobedu-tab': {
          templateUrl: 'features/user/detail/jobedu.html',
        }
      }
    })
    .state('user.detail.social', {
      url: '/social',
      views: {
        'social-tab': {
          templateUrl: 'features/user/detail/social.html',
        }
      }
    });

};
