/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

class TicketCardController extends BaseController {

  ticket;
  typeName;
  className;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.ticket = $scope['ticket'];
    this.typeName = this.getTypeName();
    this.className = this.getClassName();
  }

  private _getType() {
    var ticketType = parseInt(this.ticket.type);
    if (ticketType == 2) ticketType = 5; // 2 和 5 都是养车宝
    return ticketType;
  }

  isInvalid() {
    return (!!parseInt(this.ticket.expired)) || (!!parseInt(this.ticket.status));
  }

  getTypeName() {
    return angular.lowercase(enums.cardTypes.CardTypes[this._getType()]);
  }

  getClassName() {
    if (this.isInvalid()) {
      return 'lcb-ticket-expired';
    }
    return 'lcb-ticket-' + this.typeName;
  }

  getUrl() {
    return 'components/directives/ticket-card/ticket-' + this.typeName + '.html';
  }

}

export class Controller extends TicketCardController {}