/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'registerController';

export class RegisterController extends BaseController {

  onResultPage = false;

  static $inject = ['$scope', '$state', '$ionicSlideBoxDelegate', common.utilService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate, protected utilService: common.utilService.Service) {
    super($scope, utilService);
    super.setModalSrc('auto-agreement', '/features/share/register/agreements/auto.html');
  }

  onSuccess() {
    this.onResultPage = true;
    this.$ionicSlideBoxDelegate.next();
  }

  onFailure(err) {
    this.utilService.alert(_.get(err, 'errors.license_no')).then(() => this.onSuccess());
  }

  gotoPinan() {
    location.replace('https://mobilesdk.pingan.com.cn/ebusiness/upingan/index.html?WT.mc_id=sc03-app-shenzhen&WT.port_id=05');
  }

  attend(state) {
    this.$state.go(state);
  }

}

export class Controller extends RegisterController {}