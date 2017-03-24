/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {RegisterController} from "../../features/insurance/hunt/register-controller";

export var controllerName = 'hunt.registerController';

class EventRegisterController extends RegisterController {

  attend() {
    this.$state.go('hunt.register');
  }

  onSuccess(data?) {
    this.onResultPage = true;
    this.$state.go('hunt.success');
    //this.$ionicSlideBoxDelegate.next();
  }
}

export class Controller extends EventRegisterController {}