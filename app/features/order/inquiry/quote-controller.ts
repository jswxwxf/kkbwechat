/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.quote.QuoteController';

export class QuoteController extends BaseController {

  inquiry: any = {
    quote_id: this.$stateParams.inquiry_id,
    license_no: this.$stateParams.license_no
  };

  license_vehicle: any = {};

  static $inject = ['$scope', '$stateParams', common.utilService.serviceName, services.inquiryService.serviceName];

  constructor(private $scope, private $stateParams, protected utilService: common.utilService.Service, private inquiryService: services.inquiryService.Service) {
    super($scope, utilService);
  }

  saveLicense() {
    var payload: any = angular.copy(this.inquiry);
    payload.license_vehicle_front = Utils.toImageData(this.license_vehicle.front, true);
    payload.license_vehicle_back = Utils.toImageData(this.license_vehicle.back, true);
    this.utilService.showSpinner();
    this.inquiryService.saveLicense(payload).then(resp => this.handleResponse(resp)).finally(() => this.utilService.hideSpinner());
  }

  handleResponse(resp) {
    this.utilService.alert(resp.data.msg).then(() => this.utilService.returnBack('inquiry.list'));
  }

}

export class Controller extends QuoteController {}