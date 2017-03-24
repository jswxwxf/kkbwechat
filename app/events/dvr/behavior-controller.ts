/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BehaviorController as _BehaviorController} from "../../features/dvr/behavior-controller";

export var controllerName = 'dvr.BehaviorController';

class BehaviorController extends _BehaviorController {

}

export class Controller extends BehaviorController {}