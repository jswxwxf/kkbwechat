/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";

export var controllerName = 'envelope.ActiveController';

class ActiveController extends BaseController {

  destroyed = false;

  static $inject = ['$scope', '$state', '$timeout', 'openid', 'envelope', 'source', 'detail', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, private $state, protected $timeout, protected openid, private envelope, protected source, private detail, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.detail = detail.data.data;
    this.subscribeOnShare();
    if (this.detail.rp_status == 2) {
      this.destroyed = true;
      return;
    }
    this.timeoutTimer(moment.unix(parseInt(this.detail.rp_timeout)));
  }

  active() {
    this.utilService.showSpinner();
    this.wechatService.subscribed(this.openid).then((data) => {
      var result = data.data.data;
      if (!result.subscribed) {
        this.showModal('envelope-subscribe');
        return false;
      }
      return true;
    }).then((subscribed) => {
      if (!subscribed) return;
      this.eventsService.envelopeActive(this.openid, this.envelope, { errorHandler: (err) => {
        if (err.errorCode == 6 /* 你已经帮助过别人了 */) {
          this.utilService.alert(err.msg, { okText: '抽奖试试吧~' }).then(() => this.utilService.replaceUrl('/envelope/entry'));
          return true;
        }
      }}).success((data) => this.utilService.alert(data.msg, { okText: '我也要去抽奖' }).then(() => this.utilService.replaceUrl('/envelope/entry')));
    }).finally(() => this.utilService.hideSpinner());
  }

  onTimer() {
    this.destroyed = true;
  }

  subscribeOnShare() {

    if (!this.envelope) return;

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '一大波红包正在袭来，摇起来吧~';
    var desc = '我刚抽到了红包哦，快来帮我解锁吧~';
    var link = location.origin + `/wxevtlnk?state=envelopew.active&envelope=${this.envelope}`;
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

export class Controller extends ActiveController {}