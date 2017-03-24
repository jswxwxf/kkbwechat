/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import {BaseController} from "../../../utility/base-controller";

class PaginatorController extends BaseController {

  private _thisMonday = moment().isoWeekday(1);
  private _lastMonday = this._thisMonday.clone().day(-6);

  monday = this._thisMonday.clone();
  display = '本周';

  prevDisabled = false;
  nextDisabled = true;

  private _onWeekFn = null;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService) {
    super($scope, utilService);
    this._onWeekFn = this.$scope.onWeek || function() {};
  }

  reset() {
    this.monday = this._thisMonday.clone();
    this._setDisplay();
  }

  lastWeek() {
    this.monday.subtract(7, 'days');
    this._setDisplay();
    var enabled = this._onWeekFn({ monday: this.monday.toDate(), forward: false });
    this.prevDisabled = angular.isUndefined(enabled) ? this.prevDisabled : !!!enabled;
  }

  nextWeek() {
    this.monday.add(7, 'days');
    this._setDisplay();
    var enabled = this._onWeekFn({ monday: this.monday.toDate(), forward: true });
    this.nextDisabled = angular.isUndefined(enabled) ? this.nextDisabled : !!!enabled;
  }

  private _setDisplay() {
    this.display = this.monday.format("YYYY.MM.DD");
    this.nextDisabled = false;
    if (this.monday.isSame(this._thisMonday, 'day')) {
      this.display = '本周';
      this.nextDisabled = true;
      return;
    }
    this.prevDisabled = false;
    if (this.monday.isSame(this._lastMonday, 'day')) {
      this.display = '上周';
      return;
    }
  }

}

export class Controller extends PaginatorController {}

export class ExposedController {

  constructor(private _controller: Controller) {}

  reset() {
    this._controller.reset();
  }

}