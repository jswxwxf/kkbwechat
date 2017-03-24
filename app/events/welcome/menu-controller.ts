/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseEventListener} from "../../utility/base-event-listener";

export var controllerName = 'MenuController';

class MenuController extends BaseEventListener {

  onTokenExpired(e, result: models.result.Model) {
    this.user = null;
    this.userLoggedIn = false;
    this.utilService.deleteToken();
  }


}

export class Controller extends MenuController {}