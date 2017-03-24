/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'dvr.BehaviorController';

export class BehaviorController extends BaseController {

  behaviors;
  pager = { current_page: 0, last_page: 0 };
  option;

  chartData;

  static $inject = ['$scope', '$timeout', '$stateParams', '$ionicScrollDelegate', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $timeout, private $stateParams, private $ionicScrollDelegate, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    super.setModalSrc('charts', '/features/dvr/score.html');
  }

  switch(option) {
    this.option = option;
    this.behaviors = [];
    this.pager = { current_page: 0, last_page: 0 };
    this.loadMore();
  }

  showCharts(behavior) {
    this.chartData = behavior;
    this.$ionicScrollDelegate.$getByHandle('charts').scrollTop(true);
    this.showModal('charts');
  }

  loadMore() {
    this.utilService.showSpinner();
    var fnName = this.option.value == 'week' ? 'getWeeklySummary' : 'getMonthlySummary';
    return this.dvrService[fnName](this.$stateParams, this.pager.current_page + 1).then((data) => {
      Array.prototype.push.apply(this.behaviors, data.data.data);
      this.pager = data.data.pager;
      this.$timeout(() => {
        this.$scope.$broadcast('scroll.infiniteScrollComplete');
        this.$ionicScrollDelegate.resize();
      }, 100); // 要等一会儿要不然代理服务器吃不消
      // this.chartData = data.data.data.scores;
      // this.summary = data.data.data.summary;
      // this.summary.duration = Utils.formatDuration(this.summary.duration);
    }).finally(() => this.utilService.hideSpinner());
  }

  hasMore() {
    return this.pager.current_page < this.pager.last_page;
  }

}

export class Controller extends BehaviorController {}