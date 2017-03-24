/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";
import {Config} from "../../../config/config";
import {Utils} from "../../../utility/index";

export var controllerName = 'oauth.TokenController';

export class TokenController extends BaseController {

  static $inject = ['$scope', '$state', '$location', common.utilService.serviceName, common.storeService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private $location, private utilService: common.utilService.Service, private storeService: common.storeService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    if (Utils.first($location.search().rvm) == '1' && Utils.first($location.search().shadow) == '1') {
      this.storeService.storeTemp('token', $location.search().token);
      // var complete = (!_.isEmpty(this.$location.search().mobile)) && (!_.isEmpty(this.$location.search().license_no));
      var complete = $location.search().complete;
      if (!complete) {
        this.$location.path(Config.inWechat() ? '/oauth/rvm' : '/oauth/rvmw');
        return;
      }
    }
    if (Utils.first($location.search().read) == '1' && Utils.first($location.search().shadow) == '1') {
      this.storeService.storeTemp('token', $location.search().token);
      this.$location.path('/oauth/read');
      return;
    }
    if (Utils.first($location.search().shadow) == '1') {
      this.storeService.storeTemp('token', $location.search().token);
      this.$state.go('oauth.detail');
      return;
    }
    this.userService.loginSSOSync($location.search());
    this._loadProfile();
  }

  private _loadProfile() {
    this.utilService.showSpinner();
    this.userService.getProfile().then((data) => {
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.data.data);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  };

}

export class Controller extends TokenController {}