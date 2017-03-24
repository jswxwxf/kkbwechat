/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {CarInfoController as _CarInfoController} from "../../../features/dvr/task/carinfo-controller";

export var controllerName = 'dvr.CarInfoController';

class CarInfoController extends _CarInfoController {

}

export class Controller extends CarInfoController {}