/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.compensate2.CompensateController';

export class CompensateController extends BaseController {

  claimState = 'claim.compensate2';

  static $inject = ['$scope', '$state', 'compensate', common.utilService.serviceName, services.insuranceService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected compensate, protected utilService: common.utilService.Service, protected insuranceService: services.insuranceService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, utilService);
    this.compensate = compensate.data.data.order;
    this.subscribeOnShare();
  }

  canClaim() {
    // 需要已支付
    if (this.compensate.status != 2) return false;
    // 需要时间在有效期内
    return moment().isBetween(this.compensate.valid_from, this.compensate.claim_to);
  }

  claim() {
    this.$state.go(this.claimState, { order_id: this.compensate.order_id });
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '唯美女与毛爷爷不可辜负，点开有高潮！';
    var desc = '约美女省保费, 省下的钱可以饶地球一圈！';
    var link = location.origin + `/wxevtlnk?state=hunt2.splash`;
    var imgUrl = '';

    this.wechatService.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareTimeline({
        title,
        link,
        imgUrl,
        fail
      });
      jweixin.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl,
        fail
      });
      jweixin.onMenuShareQQ({
        title,
        desc,
        link,
        imgUrl,
        fail
      });
    });

  }

}

export class Controller extends CompensateController {}