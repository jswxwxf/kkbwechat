/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {CompensateController} from "../../features/order/compensate2/compensate-controller";

export var controllerName = 'insurance.compensate2.OrderController';

class OrderController extends CompensateController {

  claimState = 'compensate2.claim';

}

export class Controller extends OrderController {}