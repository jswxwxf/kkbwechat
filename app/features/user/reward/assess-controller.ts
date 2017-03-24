/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.travel.AssessController';

class AssessController extends BaseController {

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    super.setModalSrc('hint', '/features/user/reward/assess-hint.html');
  }

}

export class Controller extends AssessController {}