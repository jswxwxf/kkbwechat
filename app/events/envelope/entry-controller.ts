/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";

export var controllerName = 'envelope.EntryController';

class EntryController extends BaseController {

  drawAvailable = true;
  buttonText = '立即开抢';

  static $inject = ['$scope', '$state', '$timeout', 'openid', 'source', 'envelope', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $state, protected $timeout, protected openid, protected source, protected envelope, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.envelope = envelope.data.data;
    if (this.envelope.errorCode == 2) {
      this.drawAvailable = false;
      this.buttonText = '今天奖品已经没有了';
      return;
    }
    if (this.envelope.errorCode == 4) {
      this.drawAvailable = false;
      this.buttonText = '机会用尽';
      return;
    }
  }

  draw() {
    this.utilService.showSpinner();
    this.wechatService.subscribed(this.openid).success((data) => {
      var result = data.data;
      if (result.subscribed) return this.utilService.replaceState('envelope.draw');
      this.showModal('envelope-subscribe');
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends EntryController {}