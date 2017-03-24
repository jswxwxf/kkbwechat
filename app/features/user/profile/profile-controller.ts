/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.profile.ProfileController';

class ProfileController extends BaseController {

  user: models.user.Model = new models.user.Model();

  checkedIn: boolean = false;
  checkedInResult;

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    super.setModalSrc('checkedin', '/features/user/home/checkedin.html');
    this.loadProfile();
    this.loadCheckedIn();
  }

  loadProfile(reload = false) {
    this.utilService.showSpinner();
    return this.userService.getProfile(reload).success((data) => this.user = data.data).finally(() => this.utilService.hideSpinner());
  }

  loadCheckedIn() {
    this.utilService.showSpinner();
    return this.userService.isCheckedIn().success((data) => {
      this.checkedIn = data.data.is_signed;
    }).finally(() => this.utilService.hideSpinner());
  }

  updateAvatar(fileObject) {
    var _self = this['ctrl'] || this;
    _self.utilService.showSpinner();
    _self.userService.updateProfile({
      avatar: { data: fileObject.base64, filename: fileObject.filename }
    }).success(() => _self.$scope.$root.$broadcast(enums.events.Events.user_updated)).finally(() => _self.utilService.hideSpinner());
  }

  logout() {
    this.userService.logoutSync();
    this.$scope.$root.$broadcast(enums.events.Events.user_loggedout);
    this.$state.go('welcome');
  }

  checkin() {
    this.utilService.showSpinner();
    this.userService.checkIn().success((data) => {
      this.checkedIn = true;
      this.checkedInResult = data.data;
      this.showModal('checkedin');
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends ProfileController {}