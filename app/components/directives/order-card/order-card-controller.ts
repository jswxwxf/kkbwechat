/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

class OrderCardController extends BaseController {

  order;
  claim;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.order = $scope['order'];
    this.claim = !!$scope['claim'];
  }

  getUrl() {

    var filename = 'invalid';
    if (this.order && this.order.order_type) {

      var orderType: any = parseInt(this.order.order_type);
      orderType = enums.orderTypes.OrderTypes[orderType];
      if (orderType) {
        filename = angular.lowercase(orderType);
      }

    }
    return 'components/directives/order-card/' + filename + '.html';

  }

  triggerDetail($event) {
    if ($($event.target).is('div')) {
      setTimeout(() => {
        $($event.currentTarget).find('button').click();
      }, 0);
    }
  }

  getLcb15Status() {
    if (!this.order.order_15) return '无法取得状态';
    var status = parseInt(this.order.order_15.status);
    if (status == 1) return `待支付`;
    if (status == 2) return `待出单`;
    if (status == 3) return `已出单`;
    if (status == 5) return `已配送`;
    if (status == 6) return `保单生效`;
    if (status == 7) return `保单期满`;
    if (status == 8) return `退保申请已经受理`;
    if (status == 9) return `待处理`;
    if (status == 10) return `交易关闭`;
    if (status == 11) return `已完成`;
  }

  getLcb15StatusText() {
    var status = parseInt(this.order.order_15.status);
    if (status == 2) return `我们正在办您出单，如有疑问，请直接联系客服 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 8) return `您的退保申请我们已经收到，客服人员会主动联系您，如有疑问，也可以直接拔打客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 9) return `我们正在处理您的订单，如有疑问，也可以直接拔打客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
  }

  showLcb15Status() {
    this.utilService.alert(this.getLcb15StatusText());
  }

}

export class Controller extends OrderCardController {}