/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'welcome.WelcomeController';

class WelcomeController extends BaseController {

  user: models.user.Model = new models.user.Model();

  static $inject = ['$scope', 'profile', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private profile, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    if (profile) {
      this.user = profile.data.data;
    }
  }

}

export class Controller extends WelcomeController {}