/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {Utils} from "../../../utility/index";

import inquiryController = require('./inquiry-controller');
import quoteController = require('./quote-controller');

export var load = (app: angular.IModule) => {
  app.controller(inquiryController.controllerName, inquiryController.Controller)
    .controller(quoteController.controllerName, quoteController.Controller);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.inquiry', {
      abstract: true,
      url: '/inquiry?product_id&city&inquiry_id&license_no',
      template: '<ion-nav-view></ion-nav-view>',
      controller: inquiryController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        cities: [services.commonService.serviceName, (commonService: services.commonService.Service) => commonService.getCities()],
        profile: [services.userService.serviceName, (userService: services.userService.Service) => userService.getProfile()],
        activeCar: ['$q', services.carService.serviceName, ($q: angular.IQService, carService: services.carService.Service) => {
          return $q((resolve, reject) => {
            carService.getActiveCar().then(data => {
              resolve(data);
            }).catch(err => {
              resolve(Utils.mockReturn({}));
            })
          });
        }],
        // 重新报价用，只有在转入 inquiry_id 才起作用
        companies: ['$stateParams', services.inquiryService.serviceName, ($stateParams, inquiryService: services.inquiryService.Service) => {
          if (!$stateParams.inquiry_id) return;
          return inquiryService.inquiryMore({
            product_id: $stateParams.product_id,
            city: { code: $stateParams.city },
            license_no: $stateParams.license_no
          });
        }]
      },
      onEnter: [ '$location', '$state', '$stateParams', ($location, $state: angular.ui.IStateService, $stateParams) => {
        if ($stateParams.inquiry_id) return;  // 重新报价不回首页
        if ($location.path() == '/order/inquiry/basic') return;
        setTimeout(() => $state.go('order.inquiry.basic'), 0);
      }]

    })
    .state('order.inquiry.basic', {
      url: '/basic',
      templateUrl: 'features/order/inquiry/inquiry-basic.html'
    })
    .state('order.inquiry.more', {
      url: '/more',
      templateUrl: 'features/order/inquiry/inquiry-more.html'
    })
    .state('order.inquiry.insurance', {
      url: '/insurance',
      templateUrl: 'features/order/inquiry/inquiry-insurance.html'
    })
    .state('order.quote', {
      abstract: true,
      url: '/quote',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('order.quote.license', {
      url: '/license?inquiry_id&license_no',
      templateUrl: 'features/order/inquiry/quote-license.html',
      controller: quoteController.controllerName,
      controllerAs: 'ctrl'
    });
};
