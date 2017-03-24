/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import aboutController = require('./about-controller');
import feedbackController = require('./feedback-controller');

export var load = (app: angular.IModule) => {
  app.controller(aboutController.controllerName, aboutController.Controller)
    .controller(feedbackController.controllerName, feedbackController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.about', {
      url: '/about',
      templateUrl: 'features/user/about/about.html',
      controller: aboutController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('user.faq', {
      url: '/faq',
      templateUrl: 'features/user/about/faq.html'
    })
    .state('user.feedback', {
      url: '/feedback',
      templateUrl: 'features/user/about/feedback.html',
      controller: feedbackController.controllerName,
      controllerAs: 'ctrl'
    })
    .state('user.contact', {
      url: '/contact',
      templateUrl: 'features/user/about/contact.html'
    });

};
