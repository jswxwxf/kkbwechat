/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'comact.luckydraw.LuckyDrawController';

class LuckyDrawController extends BaseController {

  private _started = false;

  static $inject = ['$scope', '$state', 'openid', common.utilService.serviceName, services.eventsService.serviceName];

  constructor(private $scope, private $state, private openid, private utilService: common.utilService.Service, private eventsService: services.eventsService.Service) {
    super($scope, utilService);
  }

  start() {
    if (this._started) return;
    this.eventsService.comacDraw(this.openid).success((data) => {
      var reward = data.data.result;
      this._started = true;
      $("#wheel").rotate({
        angle: 0,
        duration: 10000,
        animateTo: 360 * 10 + (360 - (reward - 1) * 90),
        callback: () => {
          setTimeout(() => this.$state.go('comac.success', { reward }), 1000);
          //this.utilService.alert('恭喜您获得' + this._rewards[reward]);
        }
      });
    });
  }

}

export class Controller extends LuckyDrawController {}