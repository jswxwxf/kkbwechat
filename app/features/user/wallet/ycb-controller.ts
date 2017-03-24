/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.wallet.YcbController';

class YcbController extends BaseController {

  pager;

  static $inject = ['$scope', '$timeout', 'ycb', common.utilService.serviceName, services.walletService.serviceName];

  constructor(private $scope, private $timeout, private ycb, private utilService: common.utilService.Service, private walletService: services.walletService.Service) {
    super($scope, utilService);
    this.ycb = ycb.data.data;
    this.pager = ycb.data.pager;
  }

  loadMoreCards() {
    this.walletService.getYcb(this.pager.current_page + 1).success((data) => {
      Array.prototype.push.apply(this.ycb, data.data);
      this.pager = data.pager;
      this.$timeout(() => this.$scope.$broadcast('scroll.infiniteScrollComplete'), 100); // 要等一会儿要不然代理服务器吃不消
    });
  }

  hasMore() {
    return this.pager.current_page < this.pager.last_page;
  }

}


export class Controller extends YcbController {}