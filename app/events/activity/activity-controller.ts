/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {ActivityController} from "../../features/share/activity/activity-controller";

export var controllerName = 'activity.ActivityController';

export class EventActivityController extends ActivityController {

  scratchState = '/wxevtlnk?state=draw.scratch';
  inviteState = 'invite';

}

export class Controller extends EventActivityController {}