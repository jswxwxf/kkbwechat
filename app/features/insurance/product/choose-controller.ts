/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'insurance.product.ChooseController';

class ChooseController extends BaseController {

  product;

  stateMap: any = {
    kkb: 'order.inquiry.basic',
    green: 'insurance.green.register',
    auto: 'insurance.auto.register'
  }

  static $inject = ['$scope', '$state', common.utilService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private utilService: common.utilService.Service) {
    super($scope, utilService);
  }

  forward() {
    this.$state.go(this.stateMap[this.product]);
  }

}

export class Controller extends ChooseController {}