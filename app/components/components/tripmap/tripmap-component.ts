/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var componentName = 'lcbTripmap';

import controller = require('./tripmap-controller');

export var Component: angular.IComponentOptions = {

  bindings: {
    trip: '<lcbTrip'
  },

  templateUrl: 'components/components/tripmap/tripmap.html',
  controller: controller.Controller,

};