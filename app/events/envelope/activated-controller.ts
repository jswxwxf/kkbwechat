/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";

export var controllerName = 'envelope.ActivatedController';

class ActivatedController extends BaseController {

  static $inject = ['$scope', '$location', '$state', '$timeout', 'openid', 'envelope', 'source', 'detail', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, private $location, protected $state, protected $timeout, protected openid, private envelope, protected source, private detail, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.detail = detail.data.data;
    this.subscribeOnShare();
  }

  list() {
    this.$location.url(`/envelope/list?openid=${this.openid}`);
  }

  subscribeOnShare() {

    if (!this.envelope) return;
    if (!this.detail) return;

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '一大波红包正在袭来，摇起来吧';
    var desc = `我刚收到了${this.detail.rp_amount}元现金红包哦，你也来试试吧`;
    var link = location.origin + `/wxevtlnk?state=envelopew.share&envelope=${this.envelope}`;
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

export class Controller extends ActivatedController {}