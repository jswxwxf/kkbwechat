/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {TripController as _TripController} from "../../features/dvr/trip-controller";

export var controllerName = 'dvr.TripController';

class TripController extends _TripController {

}

export class Controller extends TripController {}