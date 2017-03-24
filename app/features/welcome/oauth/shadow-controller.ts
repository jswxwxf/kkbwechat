/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'oauth.ShadowController';

export class ShadowController extends BaseController {

  static $inject = ['$scope', '$state', '$location', common.utilService.serviceName, common.storeService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private $location, private utilService: common.utilService.Service, private storeService: common.storeService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    this.userService.loginSSOSync($location.search());
    this._loadProfile();
  }

  private _loadProfile() {
    this.utilService.showSpinner();
    this.userService.getProfile().then((data) => {
      this.$scope.$root.$broadcast(enums.events.Events.user_loggedin, data.data);
      this.utilService.returnBack('welcome');
    }).finally(() => this.utilService.hideSpinner());
  };

}

export class Controller extends ShadowController {}