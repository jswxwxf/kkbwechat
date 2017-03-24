/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.invite.InviteController';

export class InviteController extends BaseController {

  listSref = 'user.invite.list';

  static $inject = ['$scope', 'profile', 'list', common.utilService.serviceName, services.wechatService.serviceName, services.jsBridgeService.serviceName];

  constructor(protected $scope, protected profile, protected list, protected utilService: common.utilService.Service, protected wechatService: services.wechatService.Service, private jsBridgeService: services.jsBridgeService.Service) {
    super($scope, utilService);
    this.setModalSrc('invite-rule', '/features/user/invite/rule.html');
    this.setModalSrc('invite-agreement', '/features/user/invite/agreement.html');
    this.profile = profile.data.data;
    if (list) this.list = list.data.data;
    this.subscribeOnShare();
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = `赶紧参加驾驶评测，有机会获得40%的车险折扣！`;
    var desc = `驾驶评测火热进行中，好车主为自己代言！免费使用智能车载设备，更有养车宝等券免费领！`;
    var link = `${location.origin}/wxevtlnk?state=hunt.register&refcode=${this.profile.ref_code}`;
    var imgUrl = `${location.origin}/static/images/share_hunt.png`;

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

    this.jsBridgeService.share({
      title,
      desc,
      link,
      imgUrl,
      weiboDesc: desc,
      weiboImgUrl: imgUrl
    });

  }

}

export class Controller extends InviteController {}