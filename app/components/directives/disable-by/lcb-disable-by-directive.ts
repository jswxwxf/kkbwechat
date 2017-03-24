/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');

export var directiveName = 'lcbDisableBy';

class DisableByDirective implements angular.IDirective {

  disable: boolean;
  type;

  restrict = 'A';

  scope = {
    disableBy: '=lcbDisableBy',
    disableType: '=lcbDisplayType'
  }

  //static $inject = ['$compile'];

  //constructor(private $compile) {}

  //priority = 1000;
  //replace = true;

  link = (scope: angular.IScope, el: any, attrs: any) => {

    this.disable = !!scope['disableBy'];
    this.type = _.capitalize(scope['disableType'] || 'ListItem');

    scope.$watch('disableBy', (newVal: boolean, oldVal: boolean) => {
      this.disable = newVal;
      this.toggleListItem(el);
    });

  }

  toggleListItem = (el) => {
    this.disable ? this.disableListItem(el) : this.enableListItem(el);
  }

  enableListItem = (el) => {
    el.attr('href', el.attr('_href'));
    el.find('.icon').addClass('ion-chevron-right');
    el.removeClass('lcb-disabled');
  }

  disableListItem = (el) => {
    el.attr('_href', el.attr('href'));
    el.removeAttr('href');
    el.find('.icon').removeClass('ion-chevron-right');
    el.addClass('lcb-disabled');
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(DisableByDirective);
}];