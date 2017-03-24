/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.grade.ReportController';

export class ReportController extends BaseController {

  stage;

  static $inject = ['$scope', '$q', '$state', '$stateParams', 'activeCar', 'report', common.utilService.serviceName, services.userService.serviceName, services.wechatService.serviceName, services.jsBridgeService.serviceName];

  constructor(protected $scope, protected $q: angular.IQService, protected $state, protected $stateParams, protected activeCar, protected report, protected utilService: common.utilService.Service, protected userService: services.userService.Service, protected wechatService: services.wechatService.Service, protected jsBridgeService: services.jsBridgeService.Service) {
    super($scope, utilService);
    this.stage = $stateParams.stage || 1;
    this.activeCar = activeCar.data.data;
    this.report = report.data.data;
    this.subscribeOnShare();
  }

  loadReport(car_id) {
    this.utilService.showSpinner();
    this.userService.getReport(car_id, this.stage).success((data) => {
      this.report = data.data;
      this.subscribeOnShare();
    }).finally(() => this.utilService.hideSpinner());
  }

  subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = `我在好车主评测中获得了${this.report.grade_level}哦，有图有真相，不服来战~`;
    var desc = `您是不是好车主？来，让开开保用专业为您正名！`;
    var link = location.origin + `/wxevtlnk?state=grade.report&carId=${this.activeCar.car_id}&stage=${this.stage}`;
    var grade = this.report.grade_level;
    if (grade) grade = grade.toLowerCase();
    var imgUrl = `${location.origin}/static/images/grades/share${grade}.png`;

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
      weiboDesc: `我在好车主评测中获得了${this.report.grade_level}哦，有图有真相，快来挑战我吧！参与评测还有机会获得40%的车险折扣哦！${link} @开开保`,
      weiboImgUrl: `${location.origin}/static/images/ico_default_avatar.png`
    });

  }

}

export class Controller extends ReportController {}