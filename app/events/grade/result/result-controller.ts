/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {TestController} from "../../../features/user/grade/test-controller";

export var controllerName = 'grade.result.ResultController';

class ResultController extends TestController {

  static $inject = ['$scope', '$q', '$state', '$location', 'profile', 'result', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private $q: angular.IQService, private $state, public $location, public profile, public result, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service) {
    super($scope, $q, $state, profile, result, utilService, wechatService);
    this.result = result.data.data;
  }

  attend() {
    this.$state.go('hunt.register');
  }

}

export class Controller extends ResultController {}