/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.compensate.CompensateController';

class CompensateController extends BaseController {

  static $inject = ['$scope', '$state', 'compensate', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private compensate, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.compensate = compensate.data.data;
  }

  canClaim() {
    // 只有 已激活 或者 审核中 两种状态才可以点击
    return _.contains(['3', '4'], this.compensate.status_id);
  }

  needActivate() {
    return _.contains(['1'], this.compensate.status_id);
  }

  activate() {
    this.utilService.showSpinner();
    this.insuranceService.activeCompensate().success(() => this.$state.reload()).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends CompensateController {}