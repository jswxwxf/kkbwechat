/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseRegisterController} from "../../../utility/base-register-controller";

export var controllerName = 'insurance.hunt.registerController';

export class RegisterController extends BaseRegisterController {

  onResultPage = false;

  static $inject = ['$scope', '$q', '$state', '$stateParams', '$ionicSlideBoxDelegate', common.utilService.serviceName, services.userService.serviceName, services.registerService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, private $q: angular.IQService, protected $state: angular.ui.IStateService, private $stateParams, private $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate, protected utilService: common.utilService.Service, protected userService: services.userService.Service, protected registerService: services.registerService.Service, private wechatService: services.wechatService.Service) {
    super($scope, $state, utilService, userService, registerService, { code: 'sendHuntCode', register: 'registerHunt' });
    this.registry.ref_code = this.$stateParams.refcode;
    this.registry.source = this.$stateParams.source;
    this._subscribeOnShare();
  }

  _subscribeOnShare() {

    var fail = (res) => {
      this.utilService.alert('failed: ' + angular.toJson(res));
    };

    var title = '保费直降，车险6折！寻找好车主，限量开启。';
    var desc = '小李子都拿奥斯卡了，你还在陪跑吗？参加好车主评测，为自己正名，拿低价车险，参与即可享有价值150元的礼包！';
    var link = location.origin + '/wxevtlnk?state=hunt.intro';
    var imgUrl = location.origin + '/static/images/share_hunt.png';

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

  onSuccess(data?) {
    this.onResultPage = true;
    this.$state.go('insurance.hunt.success');
    //this.$ionicSlideBoxDelegate.next();
  }

  onFailure(err) {
    if (_.get(err, 'errors.license_no') == '车牌号 已经存在。') {
      this.utilService.alert(_.get(err, 'errors.license_no'));
      return true;
    }
  }

  attend() {
    this.$state.go('insurance.hunt.register');
  }

}

export class Controller extends RegisterController {}