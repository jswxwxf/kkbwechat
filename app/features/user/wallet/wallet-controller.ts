/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.wallet.WalletController';

class WalletController extends BaseController {

  static $inject = ['$scope', 'wallet', common.utilService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private wallet, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.wallet = wallet.data.data;
  }

}


export class Controller extends WalletController {}