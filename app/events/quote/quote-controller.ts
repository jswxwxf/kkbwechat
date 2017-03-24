/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {QuoteController as _QuoteController} from "../../features/order/inquiry/quote-controller";

export var controllerName = 'quote.quoteController';

class QuoteController extends _QuoteController {

  handleResponse(resp) {
    this.utilService.alert(resp.data.msg);
  }

}

export class Controller extends QuoteController {}