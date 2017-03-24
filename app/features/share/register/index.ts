/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');

export import registerController = require('./register-controller');

export var load = (app: angular.IModule) => {
  app.controller(registerController.controllerName, registerController.Controller);
};
