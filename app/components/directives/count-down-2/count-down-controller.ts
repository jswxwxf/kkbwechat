/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

class CountDownController extends BaseController {

  times;
  text;
  prefix;
  suffix;
  fnTimeout;

  started = false;
  reset = false;
  pauseState: any = {};
  pause = false;

  static $inject = ['$scope', '$q', '$timeout', '$interval', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private $q: angular.IQService, private $timeout: angular.ITimeoutService, private $interval: angular.IIntervalService, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.times = parseInt(this.$scope['countDown2'] || 60) - 1;
    this.text = this.$scope['text'] || '重试';
    this.prefix = this.$scope['prefix'] || '';
    this.suffix = this.$scope['suffix'] || '';
    this.fnTimeout = this.$scope['timeout'] || angular.noop;
    this.$scope.$on(enums.events.Events.countdown_reset, this.onReset.bind(this));
    this.$scope.$on(enums.events.Events.countdown_pause, this.onPause.bind(this));
    this.$scope.$on(enums.events.Events.countdown_resume, this.onResume.bind(this));
  }

  onReset() {
    this.reset = true;
  }

  onPause() {
    this.pause = true;
  }

  onResume() {
    if (!this.pause) return;
    this.pause = false;
    this.countDown(this.pauseState.fnCb, this.pauseState.count, this.pauseState.fnDone);
  }

  countDown(fnCb = angular.noop, count, fnDone = angular.noop): any {
    if (count <= 0) return fnDone();
    if (this.pause) return this.pauseState = { fnCb, count, fnDone };
    if (this.reset) {
      count = this.times;
      this.reset = false;
    }
    fnCb(count);
    this.$timeout(() => {
      this.countDown(fnCb, --count, fnDone)
    }, 1000);
  }

  enableToDisable(el) {
    this.$scope.$watch('when', (newValue, oldValue) => {
      if (newValue !== true) return;
      this.started = true;
      this.countDown((count) => el.text(this.prefix + count + this.suffix), this.times, () => {
        el.text(this.text);
        el.prop("disabled", true);
        this.fnTimeout();
      });
    });
  }

  disableToEnable(el) {
    el.click(() => {
      this.started = true;
      el.prop('disabled', true);
      this.countDown((count) => el.text(this.prefix + count + this.suffix), this.times, () => {
        el.text(this.text);
        el.prop("disabled", false);
      });
    });
  }

}

export class Controller extends CountDownController {}