/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'welcome.UserController';

class UserController extends BaseController {

  user: models.user.Model = new models.user.Model();

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    super.setModalSrc('license', '/features/welcome/license.html');
    super.setModalSrc('privacy', '/features/welcome/privacy.html');
  }

  login() {
    this.utilService.showSpinner();
    this.userService.login(this.user).success((data) => {
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.user);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  }

  sendRegisterCode() {
    this.userService.sendRegisterCode(this.user.mobile);
  }

  register() {
    this.utilService.showSpinner();
    this.userService.register(this.user).success((data) => {
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.user);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  }

  sendResetCode() {
    this.userService.sendResetCode(this.user.mobile);
  }

  resetPassword() {
    this.utilService.showSpinner();
    this.user.name = this.user.mobile;
    this.userService.resetPassword(this.user).success(() => this.login()).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends UserController {}