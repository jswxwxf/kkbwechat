/// <reference path="../../../../lib/app.d.ts" />

'use strict';

export class PrizeHelper {

  showPrizeDescription(prize) {
    this['utilService'].alert(`
      赠品介绍：${prize.description}<br/><br/>
      领取方式：订单支付后3个工作日内，客服人员将主动与您联系，确认赠品领取事宜，请耐心等待。同样您可以直接拔打电话： <a href="tel:4009663899">400-966-3899</a>。
    `, { title: prize.name });
  }

}