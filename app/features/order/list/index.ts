/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

import fanhua = require('./fanhua/index');

import listController = require('./list-controller');
import inquiriesController = require('./inquiries-controller');
import {utilService} from "../../../utility/index";

export var load = (app: angular.IModule) => {
  app.controller(listController.controllerName, listController.Controller)
    .controller(inquiriesController.controllerName, inquiriesController.Controller);
  fanhua.load(app);
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('order.list', {
      url: '/list',
      templateUrl: 'features/order/list/list.html',
      controller: listController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        orders: [common.utilService.serviceName, services.orderService.serviceName, (utilService: common.utilService.Service, orderService: services.orderService.Service) => {
          utilService.showSpinner();
          return orderService.getOrders().finally(() => utilService.hideSpinner());
        }]
      },
      onEnter: ['$location', common.utilService.serviceName, ($location, utilService: common.utilService.Service) => {
        // 支付宝支付成功会跳转到这里
        if ($location.search().is_success == 'T') {
          $location.search({});
          utilService.alert('工作日当天16点前成功支付，我们将在当天为您出单；其他时间支付将在下一工作日为您出单；出单后我们将短信通知您！', { title: '支付成功！' });
        }
      }]
    })
    .state('inquiry', {
      abstract: true,
      url: '/inquiry',
      template: '<ion-nav-view></ion-nav-view>'
    })
    .state('inquiry.list', {
      url: '/list',
      templateUrl: 'features/order/list/inquiries.html',
      controller: inquiriesController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        inquiries: [services.inquiryService.serviceName, (inquiryService: services.inquiryService.Service) => inquiryService.inquiryList()]
      }
    });

  fanhua.states($stateProvider);

};
