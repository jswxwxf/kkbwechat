/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'countDown2';

import controller = require('./count-down-controller');

class CountDownDirective implements angular.IDirective {

  restrict = 'A';

  scope = {
    countDown2: '=',
    type: '@countDownType',  // enableToDisable
    text: '@countDownText',
    when: '=countDownWhen',
    prefix: '@countDownPrefix',
    suffix: '@countDownSuffix',
    timeout: '&countDownTimeout'
  };

  controller = controller.Controller;
  controllerAs = 'ctrl';

  constructor() {}

  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {
    var type = scope['type'] || 'disableToEnable';
    scope['ctrl'][type](el);
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CountDownDirective);
}];