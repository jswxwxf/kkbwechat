/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.shop.ShopController';

class ShopController extends BaseController {

  bean;
  list;

  static $inject = ['$scope', '$q', common.utilService.serviceName, services.walletService.serviceName, services.shopService.serviceName];

  constructor(private $scope, private $q, private utilService: common.utilService.Service, private walletService: services.walletService.Service, private shopService: services.shopService.Service) {
    super($scope, utilService);
    this.load();
  }

  load() {
    this.utilService.showSpinner();
    this.walletService.getBean().then((data) => {
      this.bean = data.data.data;
    }).then(() => {
      this.shopService.getList().then((data) => {
        this.list = data.data.data;
      })
    }).finally(() => this.utilService.hideSpinner());
  }

  exchange(item) {
    this.utilService.showSpinner();
    this.shopService.exchange(item).success((data) => {
      this.utilService.alert(data.data.msg).then(() => this.load());
    }).finally(() => this.utilService.hideSpinner());
  }

}


export class Controller extends ShopController {}