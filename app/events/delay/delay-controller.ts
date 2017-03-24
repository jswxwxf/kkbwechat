/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {DelayController} from "../../features/insurance/delay/delay-controller";

export var controllerName = 'delay.DelayController';

class EventDelayController extends DelayController {

}

export class Controller extends EventDelayController {}