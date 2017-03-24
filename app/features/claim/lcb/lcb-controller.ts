/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'claim.lcb.LcbController';

class LcbController extends BaseController {

  claim;
  claimForm;
  buttonText = '申请返现';
  cert;

  static $inject = ['$scope', 'order', common.utilService.serviceName, services.claimService.serviceName];

  constructor(private $scope, private order, private utilService: common.utilService.Service, private claimService: services.claimService.Service) {
    super($scope, utilService);
    this.order = order.data.data;
    this.claim = {
      order_id: this.order.order_id,
      license_no: this.order.license_no,
      end_mile: parseInt(this.order.end_mile)
    };
  }

  claimOrder() {
    this.utilService.showSpinner();
    this.claim.cert = Utils.toImageData(this.cert);
    this.claimService.claimLcb10Order(this.claim).success(() => {
      this.order.end_mile = this.claim.end_mile;
      this.order.status = 12;
    }).finally(() => this.utilService.hideSpinner());
  }

  isReadonly() {
    return this.order.status >= 12;
  }

  isInvalid() {
    if (this.claimForm.$invalid) return true;
    if (this.order.status >= 12) {
      this.buttonText = '已申请返现';
      return true;
    }
    return false;
  }

}

export class Controller extends LcbController {}