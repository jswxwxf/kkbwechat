/// <reference path="../../../../lib/app.d.ts" />

'use strict';

/**
 * @ngdoc overview
 * @name helloYoApp
 * @description
 * # helloYoApp
 *
 * Main module of the application.
 */

//export var signupControllerName = 'SignupController';
//import signupController = require('./welcome/signup-controller');

export var load = (app: angular.IModule) => {
  //app.controller(signupControllerName, signupController.SignupController);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('insurance.lcb', {
      url: '/lcb',
      templateUrl: 'features/insurance/lcb/lcb.html'
    })
    .state('insurance.hx', {
      url: '/hx',
      templateUrl: 'features/insurance/lcb/hx.html'
    });

};
