/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'hunt2.FoolsController';

class FoolsController extends BaseController {

  static $inject = ['$scope', '$timeout', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private $timeout: angular.ITimeoutService, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service) {
    super($scope, utilService);
    this.subscribeOnShare();
    $timeout(() => ( utilService.alert('愚人节愚情未了你被骗啦！<br/>开开保“约美女保费送你夜夜大床房”活动敬请期待！') ), 3000);
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = 'XXX的床照又外泄啦！';
    var desc = '陈sir又出啥幺蛾子了？！';
    var link = location.origin + `/wxevtlnk?state=hunt2fools`;
    var imgUrl = location.origin + '/static/images/hunt2/icon_foolshare.png';

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

export class Controller extends FoolsController {}