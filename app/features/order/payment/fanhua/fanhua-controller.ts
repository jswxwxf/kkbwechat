/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');
import models = require('../../../../components/models/index');
import {BaseController} from "../../../../utility/base-controller";
import {Utils} from "../../../../utility/index";

export var controllerName = 'order.payment.FanhuaController';

class BuyController extends BaseController {

  inquiry;
  detail;
  deliveryArea;

  static $inject = ['$scope', '$state', '$stateParams', common.utilService.serviceName, services.fanhuaService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private utilService: common.utilService.Service, private fanhuaService: services.fanhuaService.Service) {
    super($scope, utilService);
    this.loadDetail();
  }

  loadDetail() {
    this.utilService.showSpinner();
    this.fanhuaService.getInquiry(this.$stateParams.inquiry_id)
      .then(resp => {
        this.inquiry = resp.data;
        this.detail = this.inquiry.data[this.$stateParams.provider_id];
        this.detail = angular.merge(_.omit(this.inquiry.quote, 'insureInfo'), this.detail);
        // this.detail.carInfo = angular.merge(this.inquiry.quote.carInfo, this.detail.carInfo);
        // this.detail.carOwner = angular.merge(this.inquiry.quote.carOwner, this.detail.carOwner);
      })
      .finally(() => this.utilService.hideSpinner());
  }

  getTotalPrice() {
    return parseFloat(<any>_.get(this.detail, 'insureInfo.efcInsureInfo.premium', 0)) +
      parseFloat(<any>_.get(this.detail, 'insureInfo.taxInsureInfo.taxFee', 0)) +
      parseFloat(<any>_.get(this.detail, 'insureInfo.bizInsureInfo.premium', 0));
  }

  pay() {
    this.utilService.showSpinner();
    this.fanhuaService.pay(this.getInquiry()).then(resp => {
      this.utilService.showSpinner();
      location.assign(resp.data.payUrl);
    }).finally(() => this.utilService.hideSpinner());
  }

  getInquiry() {
    let inquiry = {
      taskId: this.detail.taskId,
      prvId: this.detail.prvId,
      carOwner: this.detail.carOwner,
      delivery: this.detail.delivery,
      retUrl: `${location.origin}/#/order/fanhua?inquiry_id=${this.detail.taskId}`
    };
    inquiry.delivery.province = _.padRight(this.deliveryArea.code.substr(0, 2), 6, '0');
    inquiry.delivery.city = this.deliveryArea.code;
    return inquiry;
  }

}

export class Controller extends BuyController {}