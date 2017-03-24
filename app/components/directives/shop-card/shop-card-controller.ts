/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

class ShopCardController extends BaseController {

  card;
  bean;
  onExchange;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.card = $scope['card'];
    this.bean = $scope['bean'];
    this.onExchange = $scope['onExchange'] || Function.prototype;
  }

  getTypeName() {
    return angular.lowercase(enums.cardTypes.CardTypes[this.card.card_type]);
  }

  getUrl() {
    return `components/directives/shop-card/shop-${this.getTypeName()}.html`;
  }

  exchange() {
    this.onExchange({ item: this.card });
  }

}

export class Controller extends ShopCardController {}