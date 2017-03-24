/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseController} from "./base-controller";

export var controllerName = 'envelope.DrawController';

class DrawController extends BaseController {

  drawAvailable: boolean = true;
  failed: boolean = false;

  static $inject = ['$scope', '$state', '$timeout', 'ngAudio', 'openid', 'source', common.utilService.serviceName, services.eventsService.serviceName, services.wechatService.serviceName];

  constructor(protected $scope, protected $state, protected $timeout, private ngAudio, protected openid, protected source, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service, protected wechatService: services.wechatService.Service) {
    super($scope, $timeout, openid, source, utilService, eventsService, wechatService);
    this.setModalSrc('envelope-shake', '/events/envelope/shake.html');
    this.draw();
  }

  draw() {
    this.showModal('envelope-shake');
    this.failed = false;
    this.wechatService.shake().then(() => this.$timeout(() => {
      this.eventsService.envelopeDraw(this.openid, { errorHandler: (err) => {
        // 忽略所有的错误消息由入口页面处理
        this.utilService.replaceState('envelope.entry');
        return true;
      }}).success((data) => {
        var result = data.data;
        if (result.rp_amount > 0) {   // 抽中红包
          this.ngAudio.play(location.origin + '/static/audio/jackpot.mp3');
          return this.utilService.replaceState('envelope.success', { envelope: result.rp_id});
        }
        this.failed = true;   // 没抽中红包
        if (result.left_chances <= 0) this.drawAvailable = false;   // 机会用尽
      }).finally(() => this.hideModal('envelope-shake'));
    }, 1000));
  }

}

export class Controller extends DrawController {}