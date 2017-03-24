/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'share.draw.ScratchDrawController';

export class ScratchDrawController extends BaseController {

  option: any = {
    size: 30,
    progressFunction: this.onProgress.bind(this),
    completeFunction: this.onComplete.bind(this)
  };

  award;
  fetching = false;
  historyState = 'share.draw.scratch.history';

  static $inject = ['$scope', '$state', 'log', common.utilService.serviceName, services.eventsService.serviceName];

  constructor(protected $scope, private $state: angular.ui.IStateService, protected log, protected utilService: common.utilService.Service, protected eventsService: services.eventsService.Service) {
    super($scope, utilService);
    this.setModalSrc('scratch-history', '/features/share/draw/scratch-history.html');
    this._setLog(log.data.data);
    $('#eraser').eraser(this.option);
  }

  private _setLog(log) {
    this.log = log;
    if (this.log.chances <= 0) this.award = '您目前没有抽奖机会';
  }

  onProgress(p) {
    if (!this.fetching) {
      this.eventsService.scratch().success((data) => this.award = data.data.result);
      this.fetching = true;
    }
    if (p >= .5) {
      $('#eraser').eraser('clear');
    }
  }

  onComplete() {
    if (this.award) {
      this.utilService.alert(`恭喜您获得：${this.award}`).then(() => {
        location.reload(true);
      });
      return;
    }
    this.$scope.$watch(() => this.award, (newValue) => {
      if (!newValue) return;
      this.utilService.alert(`恭喜您获得：${newValue}`).then(() => {
        location.reload(true);
      });
    });
  }

}

export class Controller extends ScratchDrawController {}