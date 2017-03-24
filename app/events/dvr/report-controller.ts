/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {ReportController as _ReportController} from "../../features/dvr/report-controller";

export var controllerName = 'dvr.ReportController';

class ReportController extends _ReportController {

}

export class Controller extends ReportController {}