/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.wallet.BalanceController';

class BalanceController extends BaseController {

  pager;

  account_type: enums.accountTypes.AccountTypes;

  alipayForm;
  alipayDraw: any = {
    type: enums.accountTypes.AccountTypes.Alipay
  };
  bankForm;
  bankDraw: any = {
    type: enums.accountTypes.AccountTypes.Bank
  };
  wechatForm;
  wechatDraw: any = {
    type: enums.accountTypes.AccountTypes.Wechat,
    amounts: this.balance.data.data.balance
  };

  static $inject = ['$scope', '$state', '$timeout', 'balance', common.utilService.serviceName, services.walletService.serviceName];

  constructor(private $scope: angular.IScope, private $state: angular.ui.IStateService, private $timeout, private balance, private utilService: common.utilService.Service, private walletService: services.walletService.Service) {
    super($scope, utilService);
    this.balance = balance.data.data;
    this.pager = balance.data.pager;
    if (this.balance.balance < 200 && this.balance.balance >= 10) this.account_type = 3;
  }

  loadMoreDetail() {
    this.walletService.getBalance(this.pager.current_page + 1).success((data) => {
      Array.prototype.push.apply(this.balance.detail, data.data.detail);
      this.pager = data.pager;
      this.$timeout(() => this.$scope.$broadcast('scroll.infiniteScrollComplete'), 100); // 要等一会儿要不然代理服务器吃不消
    });
  }

  hasMore() {
    return this.pager.current_page < this.pager.last_page;
  }

  draw() {
    this.utilService.showSpinner();
    this.walletService.draw(this.getAmount()).success(() => {
      this.utilService.alert('您的提现申请已经收到，我们当尽快处理，并短信通知你').then(() => {
        this.$state.go('user.balance', null, { location: 'replace', reload: true });
      });
    }).finally(() => this.utilService.hideSpinner());
  }

  getAmount() {
    if (this.account_type == enums.accountTypes.AccountTypes.Alipay) return this.alipayDraw;
    if (this.account_type == enums.accountTypes.AccountTypes.Bank) return this.bankDraw;
    if (this.account_type == enums.accountTypes.AccountTypes.Wechat) return this.wechatDraw;
  }

  isInvalid() {
    if (this.account_type == enums.accountTypes.AccountTypes.Alipay) return this.alipayForm.$invalid;
    if (this.account_type == enums.accountTypes.AccountTypes.Bank) return this.bankForm.$invalid;
    if (this.account_type == enums.accountTypes.AccountTypes.Wechat) return this.wechatForm.$invalid;
    return true;
  }

  drawable() {
    return parseFloat(this.balance.balance) >= 10;
  }

}


export class Controller extends BalanceController {}