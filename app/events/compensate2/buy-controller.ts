/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {CompensateController} from "../../features/insurance/compensate2/compensate-controller";

export var controllerName = 'insurance.compensate2.BuyController';

class BuyController extends CompensateController {

  orderState = 'compensate2.order';

}

export class Controller extends BuyController {}