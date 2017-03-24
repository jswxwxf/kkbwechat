/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'oauth.ReadController';

class ReadController extends BaseController {

  user: any = {
    openid: this.$location.search().openid,
    mobile: this.$location.search().mobile
  };

  static $inject = ['$scope', '$state', '$location', common.utilService.serviceName, common.storeService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private $location, private utilService: common.utilService.Service, private storeService: common.storeService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    super.setModalSrc('read-agreement', '/features/dvr/read/agreement.html');
    var token = this.storeService.getTemp('token');
    if (!token) {
      $state.go('welcome');
      return;
    }
  }

  sendCode() {
    this.userService.sendRvmCode(this.user.mobile);
  }

  register() {
    this.utilService.showSpinner();
    this.userService.registerReader(this.user).then((data) => {
      this.userService.loginSSOSync(data.data);
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.data.user);
      this.utilService.returnBack('welcome', { complete: 1 }, { location: 'replace', inherit: false, lcb_inherit: false });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends ReadController {}