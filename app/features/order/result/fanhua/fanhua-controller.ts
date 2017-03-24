/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');
import models = require('../../../../components/models/index');
import {BaseController} from "../../../../utility/base-controller";
import {Utils} from "../../../../utility/index";
import {PrizeHelper} from "../prize-helper";
import {FanhuaUploadHelper} from "./fanhua-upload-helper";

export let controllerName = 'order.result.FanhuaController';

class ResultController extends BaseController {

  done;

  static $inject = ['$scope', '$state', '$timeout', '$stateParams', 'inquiry', common.utilService.serviceName, services.fanhuaService.serviceName];

  constructor(private $scope, private $state, private $timeout, private $stateParams, private inquiry, private utilService: common.utilService.Service, private fanhuaService: services.fanhuaService.Service) {
    super($scope, utilService);
    this.inquiry = inquiry.data;
    this.refreshResult();
    this.$scope.$on('$destroy', () => {
      this.done = true;
    });
    this['initHelper']();
  }

  refreshResult() {
    if (this.done) return;
    // this.utilService.toast('取回结果中……', { timeout: 1500 });
    this.fanhuaService.getInquiry(this.inquiry.taskId).then(resp => {
      if (this.done) return;
      this.done = _.keys(resp.data.data).length >= _.keys(resp.data.providers).length;
      if (!this.done) this.$timeout(() => this.refreshResult(), 2000);
      this.inquiry = resp.data;
    });
  }

  getTotalPrice(result) {
    var total = parseFloat(<any>_.get(result, 'insureInfo.efcInsureInfo.premium', 0)) +
      parseFloat(<any>_.get(result, 'insureInfo.taxInsureInfo.taxFee', 0)) +
      parseFloat(<any>_.get(result, 'insureInfo.bizInsureInfo.premium', 0));
    if (total == 0) return;
    return total;
  }

  getTaskMessage(result) {
    if (result.taskState == '3') return `支付有效期：${result.payValidTime}`;
    return result.msg;
  }

  emphasize(prvId) {
    if (!this.inquiry.data) return;
    var result = this.inquiry.data[prvId];
    if (!result) return;
    var state = parseInt(result.taskState);
    if (Utils.in([2, 14], state)) return 'lcb-cross-out';
    if (state >= 3 && state <= 17) return 'item-energized';
    return 'lcb-cross-out';
  }

  refund(result) {
    this.utilService.showSpinner();
    this.fanhuaService.refund(result.taskId, {
      taskId: result.taskId,
      prvId: result.prvId
    }).then(resp => {
      this.$state.reload();
      this.utilService.alert(resp.data.msg);
    }).finally(() => this.utilService.hideSpinner());
  }

}

Utils.applyMixins(ResultController, [FanhuaUploadHelper]);

export class Controller extends ResultController {}