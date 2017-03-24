/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');
import models = require('../../../../components/models/index');
import {BaseController} from "../../../../utility/base-controller";
import {Utils} from "../../../../utility/index";
import {PrizeHelper} from "../prize-helper";

export var controllerName = 'order.result.FanhuaDetailController';

class DetailController extends BaseController {

  inquiry;
  detail;

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

}

export class Controller extends DetailController {}