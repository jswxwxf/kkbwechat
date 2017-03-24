/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {VehicleLicenseController as _VehicleLicenseController} from "../../../features/dvr/task/vehiclelicense-controller";

export var controllerName = 'dvr.VehicleLicenseController';

class VehicleLicenseController extends _VehicleLicenseController {

}

export class Controller extends VehicleLicenseController {}