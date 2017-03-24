/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {DriverLicenseController as _DriverLicenseController} from "../../../features/dvr/task/driverlicense-controller";

export var controllerName = 'dvr.DriverLicenseController';

class DriverLicenseController extends _DriverLicenseController {

}

export class Controller extends DriverLicenseController {}