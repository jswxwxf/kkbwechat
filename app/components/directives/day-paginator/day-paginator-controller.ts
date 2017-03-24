/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

class PaginatorController extends BaseController {

  day;
  today = moment();
  date;
  onDay;
  nextDisabled = false;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService) {
    super($scope, utilService);
    this.day = moment();
    this.fireOnDay();
  }

  setDisabled() {
    this.nextDisabled = this.day.isSame(this.today, 'day') || this.day.isAfter(this.today, 'day');
  }

  previousDay() {
    this.day.subtract(1, 'd');
    this.fireOnDay();
  }

  nextDay() {
    if (this.nextDisabled) return;
    this.day.add(1, 'd');
    this.fireOnDay();
  }

  pick() {
    this.utilService.datetimePicker(this.$scope, { selected: this.day.toDate(), timeEnabled: false }).then((date) => {
      if (!date) return;    // cancelled
      this.day = moment(date);
      this.fireOnDay();
    });
  }

  fireOnDay() {
    this.onDay({ day: this.day });
    this.setDisabled();
  }

}

export class Controller extends PaginatorController {}

export class ExposedController {

  constructor(private _controller: Controller) {}

  fireOnDay() {
    this._controller.fireOnDay();
  }

}