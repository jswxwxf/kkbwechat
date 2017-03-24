/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

class PillSwitcherController extends BaseController {

  options;
  value;
  onSwitch;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.switch(_.first(this.options));
  }

  switch(opt) {
    var ret = this.onSwitch({ option: opt });
    if (ret === false) return;
    this.value = opt.value;
  }

}

export class Controller extends PillSwitcherController {}