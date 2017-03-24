/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";

export var controllerName = 'envelope.ListController';

class ListController extends BaseController {

  static $inject = ['$scope', '$state', '$timeout', 'openid', 'source', 'list', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $state, protected $timeout, protected openid, protected source, protected list, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.list = list.data.data;
  }

}

export class Controller extends ListController {}