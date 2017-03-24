/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'insurance.delay.DelayController';

export class DelayController extends BaseController {

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.setModalSrc('delay-rule', '/features/insurance/delay/rule.html');
  }

}

export class Controller extends DelayController {}