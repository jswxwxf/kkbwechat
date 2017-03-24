/// <reference path="../../../lib/app.d.ts" />

'use strict';

export import httpInterceptor = require('./http-interceptor');
export import commonService = require('./common-service');
export import userService = require('./user-service');
export import carService = require('./car-service');
export import deviceService = require('./device-service');
export import insuranceService = require('./insurance-service');
export import inquiryService = require('./inquiry-service');
export import registerService = require('./register-service');
export import wechatService = require('./wechat-service');
export import jsBridgeService = require('./jsbridge-service');
export import orderService = require('./order-service');
export import paymentService = require('./payment-service');
export import claimService = require('./claim-service');
export import walletService = require('./wallet-service');
export import shopService = require('./shop-service');
export import rewardService = require('./reward-service');
export import dvrService = require('./dvr-service');
export import readService = require('./read-service');
export import eventsService = require('./events-service');
export import fanhuaService = require('./fanhua-service');

export var load = (app: angular.IModule) => {
  app.service(httpInterceptor.serviceName, httpInterceptor.Service)
    .service(commonService.serviceName, commonService.Service)
    .service(userService.serviceName, userService.Service)
    .service(carService.serviceName, carService.Service)
    .service(deviceService.serviceName, deviceService.Service)
    .service(insuranceService.serviceName, insuranceService.Service)
    .service(inquiryService.serviceName, inquiryService.Service)
    .service(registerService.serviceName, registerService.Service)
    .service(orderService.serviceName, orderService.Service)
    .service(paymentService.serviceName, paymentService.Service)
    .service(wechatService.serviceName, wechatService.Service)
    .service(jsBridgeService.serviceName, jsBridgeService.Service)
    .service(claimService.serviceName, claimService.Service)
    .service(walletService.serviceName, walletService.Service)
    .service(shopService.serviceName, shopService.Service)
    .service(rewardService.serviceName, rewardService.Service)
    .service(dvrService.serviceName, dvrService.Service)
    .service(readService.serviceName, readService.Service)
    .service(eventsService.serviceName, eventsService.Service)
    .service(fanhuaService.serviceName, fanhuaService.Service)
    .config([ '$httpProvider', ($httpProvider: angular.IHttpProvider) => {
      $httpProvider.interceptors.push(httpInterceptor.serviceName);
    }])
};