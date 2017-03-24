/// <reference path="../../../lib/app.d.ts" />

'use strict';

export class DatetimePickerController {

  defaultOptions = {
    dateEnabled: true,
    timeEnabled: true
  };

  weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  months = { 1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月' };
  years = _.range(1900, 2999);

  rows = [ 0, 1, 2, 3, 4, 5 ];
  cols = [ 1, 2, 3, 4, 5, 6, 7 ];

  selected;

  month;
  year;
  day;
  hour;
  minute;

  firstDay;
  daysInMonth;

  _today = moment();
  today = {
    day: this._today.date(),
    month: this._today.month() + 1,
    year: this._today.year()
  };

  constructor(private scope, private opt) {
    this.selected = moment(opt.selected || this._today);
    this.opt = angular.extend(this.defaultOptions, opt);
    this.initialize();
  }

  private initialize() {
    this.setDate(this.selected);
    this.setTime(this.selected);
    this.scope.$watch(() => this.month, this.changeMonth.bind(this));
    this.scope.$watch(() => this.year, this.changeYear.bind(this));
  }

  setDate(date) {
    this.year = date.year();
    this.month = date.month() + 1 + '';
    this.day = date.date();
    this.firstDay = new Date(date.year(), date.month(), 1).getDay();
    this.daysInMonth = new Date(date.year(), date.month() + 1, 0).getDate();
  }

  setTime(date) {
    this.hour = date.hour();
    this.minute = date.minute();
  }


  getDefaultTitle() {
    if (this.opt.dateEnabled && this.opt.timeEnabled) return '请选择日期和时间';
    if (this.opt.dateEnabled) return '请选择一个日期';
    if (this.opt.timeEnabled) return '请选择一个时间';
    return '您没有配置日期或时间';
  }

  prevDate(unit) {
    this.selected.subtract(1, unit);
    this.setDate(this.selected);
  }

  nextDate(unit) {
    this.selected.add(1, unit);
    this.setDate(this.selected);
  }

  prevTime(unit) {
    this.selected.subtract(1, unit);
    this.setTime(this.selected);
  }

  nextTime(unit) {
    this.selected.add(1, unit);
    this.setTime(this.selected);
  }


  changeMonth(month) {
    if (!month) return;
    this.selected.month(month - 1);
    this.setDate(this.selected);
  }

  changeYear(year) {
    if (!year) return;
    this.selected.year(year);
    this.setDate(this.selected);
  }

  changeDay(day) {
    this.selected.date(day);
    this.setDate(this.selected);
  }

  setToday() {
    this.selected = moment();
    this.setDate(this.selected);
  }

  ok() {
    return moment([ this.year, parseInt(this.month) - 1, this.day, this.hour, this.minute ]).toDate();
  }

  cancel() {}

}
