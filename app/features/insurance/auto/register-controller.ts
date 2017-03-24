/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseRegisterController} from "../../../utility/base-register-controller";

export var controllerName = 'insurance.auto.registerController';

export class RegisterController extends BaseRegisterController {

  static $inject = ['$scope', '$q', '$state', '$stateParams', '$ionicSlideBoxDelegate', common.utilService.serviceName, services.userService.serviceName, services.registerService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $q: angular.IQService, protected $state: angular.ui.IStateService, protected $stateParams, protected $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate, protected utilService: common.utilService.Service, protected userService: services.userService.Service, protected registerService: services.registerService.Service) {
    super($scope, $state, utilService, userService, registerService, { code: 'sendAutoCode', register: 'registerAuto' });
  }

  onSuccess() {
    this.utilService.alert('登记成功');
  }

  onFailure(err) {
    if (_.get(err, 'errors.license_no') == '车牌号 已经存在。') {
      this.utilService.alert(_.get(err, 'errors.license_no'));
      return true;
    }
  }

}

export class Controller extends RegisterController {}