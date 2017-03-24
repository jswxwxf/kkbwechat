/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";
import {Utils} from "../../utility/index";

export var controllerName = 'dvr.DvrController';

export class DvrController extends BaseController {

  static $inject = ['$scope', '$stateParams', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $stateParams, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
  }

  showTrip() {
    return true;
  }

  showBehavior() {
    return true;
  }

  showReport() {
    return true;
  }

  showEarning() {
    return !_.includes(['test1'], Utils.toLower(this.$stateParams.source));
  }

}

export class Controller extends DvrController {}