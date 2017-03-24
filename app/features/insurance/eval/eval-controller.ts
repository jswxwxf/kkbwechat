/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'insurance.eval.EvalController';

class EvalController extends BaseController {

  evalParams: any = {};
  result;

  static $inject = ['$scope', 'options', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private options, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    super.setModalSrc('result', '/features/insurance/eval/result.html');
    this.options = options.data.data;
    this.evalParams.claims = this.options.claims_default + '';
  }

  calculate() {
    this.utilService.showSpinner();
    this.insuranceService.quickEval(this.evalParams).success((data) => {
      this.result = data.data;
      this.showModal('result');
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends EvalController {}