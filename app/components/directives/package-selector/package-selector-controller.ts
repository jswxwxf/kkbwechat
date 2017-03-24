/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import {BaseController} from "../../../utility/base-controller";

var packages = {
  basic: {
    "type": "basic",
    "destroy": true,
    "liability": 500000,
    "stolen": 0,
    "passenger_seat": 0,
    "driver_seat": 0,
    "scratch": 0,
    "glasses": "",
    "water": false,
    "burn": false,
    "excluding": true,
    "escape": false
  },
  premium: {
    "type": "premium",
    "destroy": true,
    "liability": 1000000,
    "stolen": 0,
    "passenger_seat": 50000,
    "driver_seat": 50000,
    "scratch": 0,
    "glasses": "国产玻璃",
    "water": false,
    "burn": false,
    "excluding": true,
    "escape": false
  },
  supreme: {
    "type": "supreme",
    "destroy": true,
    "liability": 1000000,
    "stolen": 0,
    "passenger_seat": 100000,
    "driver_seat": 100000,
    "scratch": 5000,
    "glasses": "进口玻璃",
    "water": true,
    "burn": true,
    "excluding": true,
    "escape": false
  }
};

class PackageSelectorController extends BaseController {

  private _tabUrls = {
    'basic': 'components/directives/package-selector/basic.html',
    'premium': 'components/directives/package-selector/premium.html',
    'supreme': 'components/directives/package-selector/supreme.html',
    'custom': 'components/directives/package-selector/custom.html'
  };

  currentTab = 'basic';
  currentUrl = this._tabUrls[this.currentTab];

  pkg = null;
  custom = {
    "type": "custom",
    "destroy": "true",   // 车辆损失险
    "liability": "1000000",   // 第三者责任险
    "stolen": "true",    // 全车盗抢险
    "passenger_seat": "50000",    // 乘客座位险
    "driver_seat": "50000",   // 司机座位险
    "scratch": "0",   // 划痕险
    "glasses": "0",   // 玻璃破损险
    "water": "false",   // 涉水险
    "burn": "false",    // 自燃险
    // "lights": "0",   // 后视镜和车灯险
    "excluding": "true",   // 不计免赔
    "escape": "false",  // 无法找到第三方
  };

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService) {
    super($scope, utilService);
  }

  setPackage(pkg) {
    this.pkg = pkg || this.custom;
  }

  selectTab(tab) {
    this.currentTab = tab;
    this.currentUrl = this._tabUrls[tab];
    this.pkg = packages[tab] || this.custom;
  }

}

export class Controller extends PackageSelectorController {}