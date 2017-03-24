/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class AutoSPI {

  constructor(private owner: RegisterController) {}

  sendCode(mobile) {
    return this.owner.registerService.sendAutoCode(mobile);
  }

  register(registry, anonymous, opts) {
    this.owner.utilService.showSpinner();
    return this.owner.registerService.registerAuto(registry, anonymous, opts).finally(() => this.owner.utilService.hideSpinner());
  }

}

class GreenSPI {

  constructor(private owner: RegisterController) {}

  sendCode(mobile) {
    return this.owner.registerService.sendGreenCode(mobile);
  }

  register(registry, anonymous, opts) {
    this.owner.utilService.showSpinner();
    return this.owner.registerService.registerGreen(registry, anonymous, opts).finally(() => this.owner.utilService.hideSpinner());
  }

}

class HuntSPI {

  constructor(private owner: RegisterController) {}

  sendCode(mobile) {
    return this.owner.registerService.sendHuntCode(mobile);
  }

  register(registry, anonymous, opts) {
    this.owner.utilService.showSpinner();
    var fromid = this.owner.$stateParams.fromid;
    if (fromid) registry.fromid = fromid;
    return this.owner.registerService.registerHunt(registry, anonymous, opts).finally(() => this.owner.utilService.hideSpinner());
  }

}

class RegisterController extends BaseController {

  loggedInUser;
  registry: any = {};
  mobileReadonly = false;

  product;
  productSPI;
  productSPIs: any = {
    auto: new AutoSPI(this),
    green: new GreenSPI(this),
    hunt: new HuntSPI(this)
  };

  onSuccess;
  onFailure;

  static $inject = ['$scope', '$stateParams', common.utilService.serviceName, services.userService.serviceName, services.registerService.serviceName];

  constructor(private $scope, public $stateParams, public utilService: common.utilService.Service, private userService: services.userService.Service, public registerService: services.registerService.Service) {

    super($scope, utilService);

    this.product = $scope['product'] || 'green';
    this.productSPI = this.productSPIs[this.product];
    if (!this.productSPI) throw { error: '注册的产品没有找到' };

    this.onSuccess = $scope['onSuccess'] || Function.prototype;
    this.onFailure = $scope['onFailure'] || Function.prototype;

    this._loadMobile();

  }

  private _loadMobile() {
    if (!this.userService.isLoggedIn()) return;
    this.userService.getProfile().success((data) => {
      this.loggedInUser = data.data;
      this.registry.mobile = this.loggedInUser.mobile;
      this.mobileReadonly = true;
    })
  }

  sendCode() {
    this.productSPI.sendCode(this.registry.mobile);
  }

  register() {
    this.productSPI.register(this.registry, !this.userService.isLoggedIn(), { errorHandler: (err) => {
      if (_.get(err, 'errors.license_no') == '车牌号 已经存在。') {
        this.onFailure({err});
        return true;
      }
    }}).then((data) => this.onSuccess({ data: data.data }));
  }

  getButtonClass() {
    if (this.product == 'hunt') return 'button-assertive';
    return 'button-balanced';
  }

}

export class Controller extends RegisterController {}