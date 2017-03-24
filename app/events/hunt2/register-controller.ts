/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseHunt2Controller} from "./base-hunt2-controller";

export var controllerName = 'hunt2.RegisterController';

class RegisterController extends BaseHunt2Controller {

  registry: any = {
    openid: this.openid
  };

  static $inject = ['$scope', '$q', '$state', '$stateParams', 'ngAudio', 'openid', 'source', 'order', common.utilService.serviceName, services.eventsService.serviceName, services.registerService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private $q, private $state: angular.ui.IStateService, private $stateParams, private ngAudio: any, private openid, private source, private order, private utilService: common.utilService.Service, private eventsService: services.eventsService.Service, private registerService: services.registerService.Service, private wechatService: services.wechatService.Service) {
    super($scope, source, utilService, wechatService);
  }

  sendCode() {
    this.registerService.sendHunt2Code(this.registry.mobile);
  }

  register() {
    this.utilService.showSpinner();
    this.registerService.registerHunt2(this.registry).success(() => this.$state.go('hunt2.success', this.$stateParams, { location: 'replace' })).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends RegisterController {}