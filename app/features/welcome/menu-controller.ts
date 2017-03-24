/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import enums = require('../../enums/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseEventListener} from "../../utility/base-event-listener";

export var controllerName = 'MenuController';

class MenuController extends BaseEventListener {

  static $inject = ['$scope', common.utilService.serviceName, services.userService.serviceName];

  constructor(protected $scope: angular.IScope, protected utilService: common.utilService.Service, protected userService: services.userService.Service) {
    super($scope, utilService, userService);
    if (userService.isLoggedIn()) this.onUserUpdated();
  }

}

export class Controller extends MenuController {}