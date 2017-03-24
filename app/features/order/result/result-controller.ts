/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";
import {PrizeHelper} from "./prize-helper";

export var controllerName = 'order.result.ResultController';

class ResultController extends BaseController {

  prizes;
  selectedPrizes;

  buttonStatus;

  static $inject = ['$scope', '$state', '$stateParams', 'inquiry', common.utilService.serviceName, services.inquiryService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private inquiry, private utilService: common.utilService.Service, private inquiryService: services.inquiryService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    super.setModalSrc('hunt-agreement', '/features/insurance/lcb/hunt-agreement.html');
    super.setModalSrc('green-agreement', '/features/insurance/lcb/green-agreement.html');
    super.setModalSrc('auto-agreement', '/features/share/register/agreements/auto.html');
    super.setModalSrc('hx-agreement', '/features/insurance/lcb/hx-agreement.html');
    super.setModalSrc('reward', '/features/order/result/reward.html');
    this.setInquiry(inquiry.data.data);
  }

  loadInquiry() {
    this.utilService.showSpinner();
    this.inquiryService.inquiryDetail(this.$stateParams.inquiry_id).success((data) => {
      this.setInquiry(data.data);
    }).finally(() => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.utilService.hideSpinner();
    });
  }

  setInquiry(inquiry) {
    this.inquiry = inquiry;
    if (_.contains([3, 5], this.inquiry.status)) {
      this.utilService.alert(this.getStatusText(), { title: '报价结果' });
    }
    this._setButtonStatus();
  }

  chooseRewards() {
    this.prizes = angular.copy(this.selectedPrizes);
    if (this.prizes) return this.showModal('reward');
    this.utilService.showSpinner();
    this.inquiryService.getPrizes().then(resp => {
      this.prizes = resp.data.data;
      this.selectedPrizes = angular.copy(this.prizes);
      this.showModal('reward');
    }).finally(() => this.utilService.hideSpinner());
  }

  selectPrizes() {
    this.selectedPrizes = angular.copy(this.prizes);
    this.hideModal('reward');
  }

  getSelectedPrize(prizes) {
    return _.sum(prizes, (p: any) => p.selected ? p.price : 0);
  }

  getPrizeLabel() {
    var selected = this.getSelectedPrize(this.selectedPrizes);
    if (selected > 0) return `你已选择价值${selected}的赠品`;
    return `请选择礼品（可用额度<span class="assertive">${this.inquiry.credit.reward_credit}</span>）`;
  }

  getSubPrice() {
    return Utils.parseFloat(this.inquiry.standard_commercial) + Utils.parseFloat(this.inquiry.compulsory) + Utils.parseFloat(this.inquiry.tax);
  }

  getDiscountPrice() {
    var price = this.getSubPrice();
    if (this.inquiry.product_id == 1 /* 优选 */) {
      price -= Utils.parseFloat(this.inquiry.rate_dis);
    }
    if (this.inquiry.product_id == 4 /* 惠选 */) {
      price -= Utils.parseFloat(this.inquiry.credit.usable);
      price -= Utils.parseFloat(this.inquiry.prizes_remain);
    }
    return price;
  }

  isProcessingRenewal() {
    if (this.inquiry.status > 4) return false;
    return this.inquiry.renewal || false;
  }

  buy() {
    var prizes = _.pluck( _.filter(this.selectedPrizes, { selected: true }), 'id');
    var params: any = { order_id: this.inquiry.id };
    if (!_.isEmpty(prizes)) params.prizes = prizes;
    this.$state.go('order.buy', params);
  }

  getStatusText() {
    if (!this.inquiry) return;
    var status = parseInt(this.inquiry.status);
    if (status == 2) return `行驶证审核未通过，需要重新提交，请点击 <a href="/#/order/quote/license?inquiry_id=${this.inquiry.id}&license_no=${this.inquiry.license_no}">这里</a> 重新上传行驶证照片。`;
    if (status <= 4) return `我们将尽快为您反馈结果，并短信通知您，请耐心等待（非工作时间会有延迟）。客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 5) return `报价结果已出，请尽快确认订单并支付，锁定价格。客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 6) return `未到可投保时间，无法获取精准价格，在可以获得精准价格时，客服会主动联系你。客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 7) return `非常报歉，根据您提供的信息，保险公司暂未反馈报价结果，请您过一段时间再重新尝试。`;
    if (status == 9) return `非常抱歉，由于您未在7天内提交订单锁定价格，当前报价已经失效，请点击 <a href="/#/order/inquiry/insurance?product_id=${this.inquiry.product_id}&city=${this.inquiry.city_id}&inquiry_id=${this.inquiry.id}&license_no=${this.inquiry.license_no}">这里</a> 重新发起报价，获取最新价格。`;
  }

  showAgreement() {
    var modal = [ 'hunt-agreement', 'green-agreement', 'auto-agreement', 'hx-agreement' ][this.inquiry.product_id - 1];
    this.showModal(modal);
  }

  private _setButtonStatus() {
    this.buttonStatus = {
      showPrice: _.contains([5, 9], this.inquiry.status),
      canNew: _.contains([5, 6, 7], this.inquiry.status),
      canBuy: this.inquiry.status == 5
    }
  }

}

Utils.applyMixins(ResultController, [PrizeHelper]);

export class Controller extends ResultController {}