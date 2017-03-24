/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'insurance.compensate2.IntroController';

export class IntroController extends BaseController {

  compensate2Url = '#/insurance/compensate2';

  static $inject = ['$scope', '$state', common.utilService.serviceName];

  constructor(protected $scope, protected $state: angular.ui.IStateService, protected utilService: common.utilService.Service) {
    super($scope, utilService);
  }

}

export class Controller extends IntroController {}