/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'envelope.SuccessController';

class SuccessController extends BaseController {

  drawAvailable: boolean = true;

  static $inject = ['$scope', '$state', '$timeout', 'openid', 'source', 'detail', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $state, protected $timeout, protected openid, protected source, protected detail, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.detail = detail.data.data;
    this.timeoutTimer(moment.unix(parseInt(this.detail.rp_timeout)));
    this.subscribeOnShare();
    this.refresh();
  }

  refresh() {
    this.$timeout(() => this.$state.reload(), 5000);
  }

  onTimer() {
    this.$state.go('envelope.destroy');
  }

  subscribeOnShare() {

    if (!this.detail) return;

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '一大波红包正在袭来，摇起来吧~';
    var desc = '我刚抽到了红包哦，快来帮我解锁吧~';
    var link = location.origin + `/wxevtlnk?state=envelopew.active&envelope=${this.detail.rp_id}`;
    var imgUrl = location.origin + '/static/images/envelope/share.png';

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
    });

  }

}

export class Controller extends SuccessController {}