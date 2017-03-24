/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

class InquiryCardController extends BaseController {

  inquiry;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
  }

  getCount() {
    return `${_.keys(this.inquiry.data).length}/${_.keys(this.inquiry.providers).length}`;
  }

}

export class Controller extends InquiryCardController {}