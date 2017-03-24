/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

export import orderController = require('./order-controller');

export var load = (app: angular.IModule) => {
  app.controller(orderController.controllerName, orderController.Controller);
};
