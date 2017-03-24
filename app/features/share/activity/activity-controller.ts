/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'share.activity.ActivityController';

export class ActivityController extends BaseController {

  scratchState = 'share-draw-scratch';
  inviteState = 'user.invite';

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(protected $scope, protected utilService: common.utilService.Service) {
    super($scope, utilService);
  }

}

export class Controller extends ActivityController {}