/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'oauth.OAuthController';

class OAuthController extends BaseController {

  oauth;
  user: models.user.Model = new models.user.Model();

  static $inject = ['$scope', '$state', common.utilService.serviceName, common.storeService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private utilService: common.utilService.Service, private storeService: common.storeService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    super.setModalSrc('license', '/features/welcome/license.html');
    super.setModalSrc('privacy', '/features/welcome/privacy.html');
    var token = this.storeService.getTemp('token');
    if (!token) {
      $state.go('welcome');
      return;
    }
    this.oauth = { token: token };
    //this.userService.loginSSO();
  }

  sendCode() {
    this.userService.sendRegisterCode(this.user.mobile);
  }

  register() {
    this.utilService.showSpinner();
    this.userService.registerSSO(this.user).success((data) => {
      this.userService.loginSSOSync(this.oauth);
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.user);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  }

  bind() {
    this.utilService.showSpinner();
    this.userService.bindSSO(this.user).success((data) => {
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.user);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends OAuthController {}