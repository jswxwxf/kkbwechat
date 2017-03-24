/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {EarningController as _EarningController} from "../../features/dvr/earning-controller";

export var controllerName = 'dvr.EarningController';

class EarningController extends _EarningController {

}

export class Controller extends EarningController {}