/// <reference path="../../lib/app.d.ts" />

'use strict';

import common = require('./index');
import services = require('../components/services/index');
import {BaseController} from "./base-controller";

export abstract class BaseRegisterController extends BaseController {

  loggedInUser;
  registry: any = {};
  mobileReadonly = false;

  constructor(protected $scope: angular.IScope, protected $state: angular.ui.IStateService, protected utilService: common.utilService.Service, protected userService: services.userService.Service, protected registerService: services.registerService.Service, protected registerProvider) {
    super($scope, utilService);
    super.setModalSrc('auto-agreement', '/features/share/register/agreements/auto.html');
    this._loadMobile();
  }

  private _loadMobile() {
    if (!this.userService.isLoggedIn()) return;
    this.userService.getProfile().success((data) => {
      this.loggedInUser = data.data;
      this.registry.mobile = data.data.mobile;
      this.mobileReadonly = true;
    })
  }

  sendCode() {
    this.registerService[this.registerProvider.code](this.registry.mobile)
  }

  register() {
    this.registerService[this.registerProvider.register](this.registry, !this.userService.isLoggedIn(), { errorHandler: this.onFailure.bind(this) }).then((data) => this.onSuccess({ data: data.data }));
  }

  onSuccess(data?) {}

  onFailure(err) {
    if (_.get(err, 'errors.license_no') == '车牌号 已经存在。') {
      this.utilService.alert(_.get(err, 'errors.license_no')).then(() => this.onSuccess());
      return true;
    }
  }

  attend(stateName) {
    this.$state.go(stateName);
  }

  gotoPinan() {
    location.replace('https://mobilesdk.pingan.com.cn/ebusiness/upingan/index.html?WT.mc_id=sc03-app-shenzhen&WT.port_id=05');
  }

}