/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'comact.luckydraw.SuccessController';

class SuccessController extends BaseController {

  rewards = {
    1: '恭喜您获得一年免费车险',
    2: '恭喜您获得100元卡拉丁服务券',
    3: '谢谢参与',
    4: '恭喜您获得50元养车宝代金券'
  };

  reward;

  static $inject = ['$scope', '$stateParams', 'device', common.utilService.serviceName, services.eventsService.serviceName];

  constructor(private $scope, private $stateParams, private device, private utilService: common.utilService.Service, private eventsService: services.eventsService.Service) {
    super($scope, utilService);
    this.device = device.data.data;
    this.reward = this.rewards[$stateParams.reward || 3];
  }

}

export class Controller extends SuccessController {}