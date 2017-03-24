/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.detail.DetailController';

class DetailController extends BaseController {

  detail: models.user.DetailModel = new models.user.DetailModel();

  static $inject = ['$scope', 'profile', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private profile, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    this.profile = profile.data.data;
    this.detail = models.user.DetailModel.toVO(this.profile.userinfo);
  }

  updateDetail() {
    this.utilService.showSpinner();
    delete this.detail['driving_license'];
    delete this.detail['credit'];
    this.userService.updateDetail(models.user.DetailModel.fromVO(this.detail)).success(() => this.utilService.alert('更新成功')).finally(() => this.utilService.hideSpinner());
  }

  updateDriverLicense(fileObject) {
    var _self = this['ctrl'] || this;
    _self.utilService.showSpinner();
    _self.userService.updateDetail({
      driving_license: { data: fileObject.base64, filename: fileObject.filename }
    }).success(() => _self.$scope.$root.$broadcast(enums.events.Events.user_updated)).finally(() => _self.utilService.hideSpinner());
  }

  updateCredit(fileObject) {
    var _self = this['ctrl'] || this;
    _self.utilService.showSpinner();
    _self.userService.updateDetail({
      credit: { data: fileObject.base64, filename: fileObject.filename }
    }).success(() => _self.$scope.$root.$broadcast(enums.events.Events.user_updated)).finally(() => _self.utilService.hideSpinner());
  }

}

export class Controller extends DetailController {}