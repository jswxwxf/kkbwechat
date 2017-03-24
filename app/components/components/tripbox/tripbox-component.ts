/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var componentName = 'lcbTripbox';

import controller = require('./tripbox-controller');

export var Component: angular.IComponentOptions = {

  bindings: {
    trip: '=lcbTrip',
    onDelete: '&lcbOnDelete',
    onMap: '&lcbOnMap'
  },

  templateUrl: 'components/components/tripbox/tripbox.html',
  controller: controller.Controller,

};