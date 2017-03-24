/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.stolen.StolenController';

class StolenController extends BaseController {

  static $inject = ['$scope', 'stolen', common.utilService.serviceName];

  constructor(private $scope, private stolen, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.stolen = stolen.data.data;
  }

}

export class Controller extends StolenController {}