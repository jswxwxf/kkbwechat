'use strict';

export var componentName = 'lcbEarningTaskbox';

import controller = require('./earningtaskbox-controller');

export var Component: angular.IComponentOptions = {

  bindings: {
    trip: '=lcbTrip',
    onDelete: '&lcbOnDelete'
  },

  templateUrl: 'components/components/earningtaskbox/earningtaskbox.html',
  controller: controller.Controller,

};