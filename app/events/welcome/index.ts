/// <reference path="../../../lib/app.d.ts" />

'use strict';

import menuController = require('./menu-controller');

export var load = (app: angular.IModule) => {
  app.controller(menuController.controllerName, menuController.Controller)
};

export var states = ($stateProvider: angular.ui.IStateProvider) => {

};
