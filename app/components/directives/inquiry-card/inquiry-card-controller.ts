/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {ProductTypes} from "../../../enums/product-types";
import {BaseController} from "../../../utility/base-controller";

class OrderCardController extends BaseController {

  inquiry;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.inquiry = $scope['inquiry'];
  }

  getUrl() {

    var filename = 'invalid';
    if (this.inquiry) {
      var productType: any = parseInt(this.inquiry.product_id);
      productType = ProductTypes[productType] || 'unknown';
      filename = angular.lowercase(productType);
    }
    return 'components/directives/inquiry-card/' + filename + '.html';

  }

  triggerDetail($event) {
    if ($($event.target).is('div')) {
      setTimeout(() => {
        $($event.currentTarget).find('button').click();
      }, 0);
    }
  }

  getStatus() {
    var status = parseInt(this.inquiry.status);
    if (status == 2) return `行驶证审核未通过`;
    if (status <= 4) return `报价中`;
    if (status == 5) return `已出报价结果`;
    if (status == 6) return `未到投保时间`;
    if (status == 7) return `获取报价失败`;
    if (status == 9) return `报价失效`;
  }

  getStatusText() {
    var status = parseInt(this.inquiry.status);
    if (status <= 4) return `获取精准报价后，我们会短信通知您，请耐心等待（非工作时间会有延迟，敬请理解）`;
    if (status == 6) return `经核查，您的车险尚未到投保时间，无法获取精确报价，待可以投保时，我们会主动联系您，敬请谅解。客服电话 <a href="tel:4009663899">400-966-3899</a>。`;
    if (status == 7) return `非常抱歉，根据您提供的信息，保险公司暂时未反馈报价结果，请您过一段时间再重新尝试。`;
  }

  showStatus() {
    this.utilService.alert(this.getStatusText());
  }

}

export class Controller extends OrderCardController {}