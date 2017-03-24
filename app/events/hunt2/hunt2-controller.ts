/// <reference path="../../../lib/app.d.ts" />

import {BaseHunt2Controller} from "./base-hunt2-controller";
'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "../../utility/base-controller";
import {Config} from "../../config/config";

export var controllerName = 'hunt2.Hunt2Controller';

class Hunt2Controller extends BaseHunt2Controller {

  static $inject = ['$scope', 'source', common.utilService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private source, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service) {
    super($scope, source, utilService, wechatService);
    this.subscribeOnShare();
  }

}

export class Controller extends Hunt2Controller {}