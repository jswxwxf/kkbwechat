/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');

export var directiveName = 'lcbChart';

import loaders = require('./loaders');
import {Loader} from "./loaders";

class ChartsDirective implements angular.IDirective {

  restrict = 'E';
  replace = true;

  static $inject = [common.utilService.serviceName, services.carService.serviceName];

  constructor(private utilService: common.utilService.Service, private carService: services.carService.Service) {}

  templateUrl = (el, attrs: any) => {
    var chart = attrs['chartOf'];
    if (!chart) throw 'chart-of 属性没有设置';
    return 'components/directives/charts/' + chart + '/chart.html';
  };

  link = (scope: angular.IScope, iEl: angular.IAugmentedJQuery, iAttrs: any) => {
    this.initialLoader(scope, iAttrs).load();
  };

  initialLoader = (scope, attrs): Loader => {
    var loader = _.camelCase(attrs['chartOf']) + 'Loader';
    return new loaders[loader].Loader(scope, attrs, this.utilService, this.carService);
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(ChartsDirective);
}];