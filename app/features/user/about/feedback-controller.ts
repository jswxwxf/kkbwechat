/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.about.FeedbackController';

class FeedbackController extends BaseController {

  feedback;

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
  }

  sendFeedback() {
    this.utilService.showSpinner();
    this.userService.sendFeedback(this.feedback).success(() => this.$state.go('user.about')).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends FeedbackController {}