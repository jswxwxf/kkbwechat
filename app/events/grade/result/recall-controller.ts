/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'grade.recall.RecallController';

export class EventRecallController extends BaseController {

  static $inject = ['$scope', 'agreement', common.utilService.serviceName];

  constructor(protected $scope, private agreement, protected utilService: common.utilService.Service) {
    super($scope, utilService);
    this.agreement = agreement.data.data;
  }

}

export class Controller extends EventRecallController {}