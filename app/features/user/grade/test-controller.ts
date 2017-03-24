/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.grade.TestController';

export class TestController extends BaseController {

  static $inject = ['$scope', '$q', '$state', 'profile', 'result', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $testScope, private $testQ: angular.IQService, private $testState, public profile, public result, private testUtilService: common.utilService.Service, private testWechatService: services.wechatService.Service) {
    super($testScope, testUtilService);
    if (profile) this.profile = profile.data.data;
    if (result) {
      this.result = result.data.data;
      this.subscribeOnShare();
    }
  }

  attend() {
    this.$testState.go('insurance.hunt.register');
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.testUtilService.alert('failed: ' + angular.toJson(res));
    };

    var title = `好车主认证我获得${this.result.grade}哦，能花${this.result.discount}%买车险！你呢？`;
    var desc = `开开保寻找好车主，最高可以拿到40%折扣相当于电销价的七折哦！欢迎报名！`;
    var link = location.origin + `/wxevtlnk?state=grade.result&userId=${this.profile.id}`;
    var grade = this.result.grade;
    if (grade) grade = grade.toLowerCase();
    var imgUrl = `${location.origin}/static/images/grades/share${grade}.png`;

    this.testWechatService.getJsSDK().then((jweixin: any) => {
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

export class Controller extends TestController {}