/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');
import models = require('../../../../components/models/index');
import {BaseController} from "../../../../utility/base-controller";

export var controllerName = 'order.list.Inquiries3Controller';

class Inquiries3Controller extends BaseController {

  static $inject = ['$scope', '$state', 'inquiries', common.utilService.serviceName, services.fanhuaService.serviceName];

  constructor(private $scope, private $state, private inquiries, private utilService: common.utilService.Service, private fanhuaService: services.fanhuaService.Service) {
    super($scope, utilService);
    this.inquiries = inquiries.data;
  }

  remove(inquiry) {
    this.utilService.showSpinner();
    this.fanhuaService.deleteInquiry(inquiry.taskId).then(() => {
      this.$state.reload();
    }).finally(() => this.utilService.hideSpinner());
  }

}


export class Controller extends Inquiries3Controller {}