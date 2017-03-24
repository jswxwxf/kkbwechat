/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

import walletController = require('./wallet-controller');
import balanceController = require('./balance-controller')
import beanController = require('./bean-controller');
import couponController = require('./coupon-controller');
import ycbController = require('./ycb-controller');
import kldController = require('./kld-controller');

export var load = (app: angular.IModule) => {
  app.controller(walletController.controllerName, walletController.Controller)
    .controller(balanceController.controllerName, balanceController.Controller)
    .controller(beanController.controllerName, beanController.Controller)
    .controller(couponController.controllerName, couponController.Controller)
    .controller(ycbController.controllerName, ycbController.Controller)
    .controller(kldController.controllerName, kldController.Controller);
};

var resolveBalance = (check = false) => {
  return ['$q', common.utilService.serviceName, services.walletService.serviceName, ($q: angular.IQService, utilService: common.utilService.Service, walletService: services.walletService.Service) => {
    // 检查余额, 如果余额不够, 阻止用户进入
    return $q((resolve, reject) => {
      utilService.showSpinner();
      walletService.getBalance().success((data) => {
        if (check && parseInt(data.data.balance) < 10) return reject({ code: enums.errors.Errors.GeneralError, error: '余额不够' });
        resolve({ data: data });
      }).finally(() => utilService.hideSpinner());
    });
  }];
};


export var states = ($stateProvider: angular.ui.IStateProvider) => {

  $stateProvider
    .state('user.wallet', {
      url: '/wallet',
      templateUrl: 'features/user/wallet/wallet.html',
      controller: walletController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        wallet: [common.utilService.serviceName, services.walletService.serviceName, (utilService: common.utilService.Service, walletService: services.walletService.Service) => {
          utilService.showSpinner();
          return walletService.getWallet().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.balance', {
      url: '/balance',
      templateUrl: 'features/user/wallet/balance.html',
      controller: balanceController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        balance: resolveBalance()
      }
    })
    .state('user.balance.draw', {
      url: '/draw',
      views: {
        "@user": {
          templateUrl: 'features/user/wallet/draw.html',
          controller: balanceController.controllerName,
          controllerAs: 'ctrl',
          resolve: {
            balance: resolveBalance(true)
          }
        }
      }
    })
    .state('user.bean', {
      url: '/bean',
      templateUrl: 'features/user/wallet/bean.html',
      controller: beanController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        bean: [common.utilService.serviceName, services.walletService.serviceName, (utilService: common.utilService.Service, walletService: services.walletService.Service) => {
          utilService.showSpinner();
          return walletService.getBean().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.coupon', {
      url: '/coupon',
      templateUrl: 'features/user/wallet/coupon.html',
      controller: couponController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        coupon: [common.utilService.serviceName, services.walletService.serviceName, (utilService: common.utilService.Service, walletService: services.walletService.Service) => {
          utilService.showSpinner();
          return walletService.getCoupon().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.ycb', {
      url: '/ycb',
      templateUrl: 'features/user/wallet/ycb.html',
      controller: ycbController.controllerName,
      controllerAs: 'ctrl',
      resolve: {
        ycb: [common.utilService.serviceName, services.walletService.serviceName, (utilService: common.utilService.Service, walletService: services.walletService.Service) => {
          utilService.showSpinner();
          return walletService.getYcb().finally(() => utilService.hideSpinner());
        }]
      }
    })
    .state('user.ticket', {
      url: '/ticket',
      templateUrl: 'features/user/wallet/ticket.html'
    })
    .state('user.wlt', {
      url: '/wlt',
      templateUrl: 'features/user/wallet/wlt.html'
    })
    .state('user.kld', {
      url: '/kld',
      templateUrl: 'features/user/wallet/kld.html',
      controller: kldController.controllerName,
      controllerAs: 'ctrl'
    });

};
