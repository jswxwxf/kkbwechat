/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'countDown';

class CountDownDirective implements angular.IDirective {

  restrict = 'A';

  static $inject = ['$interval'];

  constructor(private $interval: angular.IIntervalService) {}

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    var times = parseInt(attrs['countDown'] || 60) - 1,
      countDownText = attrs['countDownText'] || '重新获取';
    var stop;
    el.click(() => {
      if (stop) this.$interval.cancel(stop);
      el.prop('disabled', true);
      var count = times;
      stop = this.$interval(() => el.text(count--), 1000, times, false);
      stop.then(() => {
        el.text(countDownText);
        el.prop("disabled", false);
      });
    });
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CountDownDirective);
}];