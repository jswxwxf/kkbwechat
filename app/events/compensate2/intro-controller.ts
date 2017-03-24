/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {IntroController as _IntroController} from "../../features/insurance/compensate2/intro-controller";

export var controllerName = 'insurance.compensate2.IntroController';

class IntroController extends _IntroController {

  compensate2Url = 'event/#/compensate2/buy';

}

export class Controller extends IntroController {}