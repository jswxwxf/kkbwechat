/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class CouponSelectorController extends BaseController {

  coupons;
  coupon;

  static $inject = ['$scope', common.utilService.serviceName, services.walletService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service, private walletService: services.walletService.Service) {
    super($scope, utilService);
    super.setModalSrc('coupons', '/components/directives/coupon-selector/coupons.html');
    this.loadCoupons();
  }

  loadCoupons() {
    this.walletService.getAvailableCoupon().then(resp => {
      this.coupons = resp.data.data;
    });
  }

  showCoupons() {
    this.showModal('coupons');
  }

}

export class Controller extends CouponSelectorController {}