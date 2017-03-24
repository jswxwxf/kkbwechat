/// <reference path="../../../../lib/app.d.ts" />

'use strict';

export var componentName = 'lcbBehaviorbox';

import controller = require('./behaviorbox-controller');

export var Component: angular.IComponentOptions = {

  bindings: {
    behavior: '=lcbBehavior',
    period: '=lcbPeriod',
    onClick: '&lcbClick'
  },

  templateUrl: 'components/components/behaviorbox/behaviorbox.html',
  controller: controller.Controller,

};