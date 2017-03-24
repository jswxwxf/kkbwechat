/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {RegisterController} from "../../features/share/register/register-controller";

export var controllerName = 'auto.registerController';

class EventRegisterController extends RegisterController {

  attend() {
    this.$state.go('auto.register');
  }

}

export class Controller extends EventRegisterController {}