/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseHunt2Controller} from "./base-hunt2-controller";

export var controllerName = 'hunt2.SuccessController';

class SuccessController extends BaseHunt2Controller {

  static $inject = ['$scope', 'source', 'detail', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private source, private detail, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service) {
    super($scope,source, utilService, wechatService);
    this.detail = detail.data.data;
  }

}

export class Controller extends SuccessController {}