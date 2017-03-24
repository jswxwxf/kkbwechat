/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.wallet.KldController';

class KldController extends BaseController {

  kld;

  static $inject = ['$scope', '$state', common.utilService.serviceName, services.walletService.serviceName];

  constructor(private $scope: angular.IScope, private $state, private utilService: common.utilService.Service, private walletService: services.walletService.Service) {
    super($scope, utilService);
  }

  apply() {
    this.utilService.showSpinner();
    this.walletService.applyKld(this.kld).success((data) => {
      this.utilService.alert('服务预约成功，我们将尽快电话联系您，确认服务时间。').then(() => {
        this.$state.go('user.wallet', null, { location: 'replace' });
      })
    }).finally(() => this.utilService.hideSpinner());
  }

}


export class Controller extends KldController {}