/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class BehaviorboxController extends BaseController {

  behavior;
  rate;
  onClick;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.rate = this.behavior.score / 20;
  }

  handleClick() {
    this.onClick({ behavior: this.behavior });
  }

}

export class Controller extends BehaviorboxController {}