/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'claim.compensate.CompensateController';

class CompensateController extends BaseController {

  compensateForm;

  static $inject = ['$scope', '$state', 'compensate', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private compensate, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.compensate = models.compensate.Model.toVO(compensate.data.data);
  }

  canClaim() {
    // 只有 已激活 的订单才可点击
    return this.compensate.status_id == '3' && this.compensateForm.$valid;
  }

  readonly() {
    return this.compensate.status_id != '3';
  }

  claim() {
    this.utilService.showSpinner();
    this.insuranceService.claimCompensate(models.compensate.Model.toClaim(this.compensate)).success((data) => {
      this.$state.reload();
      this.utilService.alert('您的申请提交成功，我们将尽快处理反馈。');
    }).finally(() => this.utilService.hideSpinner());
  }

  getStatusText() {
    if (this.compensate.status_id == '4') return '您的申请正在审核中，请耐心等待';
  }

}

export class Controller extends CompensateController {}