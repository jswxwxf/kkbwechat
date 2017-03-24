/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.about.AboutController';

class AboutController extends BaseController {

  clickCount = 0;

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
  }

  logout() {
    this.clickCount++;
    console.log(this.clickCount);
    if (this.clickCount < 5) return;
    console.log('logging out');
    this.userService.logoutSync();
    this.$scope.$root.$broadcast(enums.events.Events.user_loggedout);
    this.$state.go('welcome');
  }

}

export class Controller extends AboutController {}