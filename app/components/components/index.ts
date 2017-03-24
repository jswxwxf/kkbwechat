/// <reference path="../../../lib/app.d.ts" />

'use strict';

import tripboxComponent = require('./tripbox/tripbox-component');
import tripmapComponent = require('./tripmap/tripmap-component');
import behaviorboxComponent = require('./behaviorbox/behaviorbox-component');
import earningTaskBoxComponent = require('./earningtaskbox/earningtaskbox-component');

export var load = (app: angular.IModule) => {
  app.component(tripboxComponent.componentName, tripboxComponent.Component)
    .component(tripmapComponent.componentName, tripmapComponent.Component)
    .component(behaviorboxComponent.componentName, behaviorboxComponent.Component)
    .component(earningTaskBoxComponent.componentName, earningTaskBoxComponent.Component);
};