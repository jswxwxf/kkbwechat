/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController as _BaseController} from "../../utility/base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'envelope.BaseController';

export class BaseController extends _BaseController {

  title = '助力红包';
  timeoutMessage;

  static $inject = ['$scope', '$timeout', 'openid', 'source', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected scope, protected $timeout, protected openid, protected source, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super(scope, utilService);
    this.setModalSrc('envelope-rule', '/events/envelope/rule.html');
    this.setModalSrc('envelope-subscribe', '/events/envelope/subscribe.html');
    this.wechatService.hideMenuItems([ 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone' ]);
    this.subscribeOnShare();
  }

  timeoutTimer(to) {
    var timeout = to.diff(moment(), 'seconds');
    if (timeout <= 0) return this.onTimer();
    timeout = Utils.secondsToTime(timeout);
    this.timeoutMessage = '';
    if (timeout.h > 0) this.timeoutMessage += `${timeout.h + 1}小时`;
    if (timeout.m > 0) this.timeoutMessage += `${timeout.m + 1}分钟`;
    if (timeout.h == 0 && timeout.m == 0) this.timeoutMessage = `${timeout.s}秒`;
    this.$timeout(() => {
      this.timeoutTimer(to);
    }, 1000);
  }

  onTimer() {}

  subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '一大波红包正在袭来，摇起来吧';
    var desc = '现金红包，现金红包，现金红包，重要的事情说三遍！';
    var link = location.origin + `/wxevtlnk?state=envelope.entry`;
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

export class Controller extends BaseController {}