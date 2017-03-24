/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "../../utility/base-controller";

export class BaseHunt2Controller extends BaseController {

  shareImg = location.origin + '/static/images/hunt2/share.png';

  static $inject = ['$scope', 'source', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $hunt2Scope, private hunt2Source, private hunt2UtilService: common.utilService.Service, private hunt2WechatService: services.wechatService.Service) {
    super($hunt2Scope, hunt2UtilService);
    this.subscribeOnShare();
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.hunt2UtilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '唯美女与毛爷爷不可辜负，点开有高潮！';
    var desc = '约美女省保费, 省下的钱可以饶地球一圈！';
    var link = location.origin + `/wxevtlnk?state=hunt2.splash&source=${this.hunt2Source}`;

    this.hunt2WechatService.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareTimeline({
        title,
        link,
        imgUrl: this.shareImg,
        fail
      });
      jweixin.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl: this.shareImg,
        fail
      });
      jweixin.onMenuShareQQ({
        title,
        desc,
        link,
        imgUrl: this.shareImg,
        fail
      });
    });

  }

}