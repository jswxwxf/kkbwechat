/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import {ShadowController as _ShadowController} from "../../features/welcome/oauth/shadow-controller";

export var controllerName = 'oauth.ShadowController';

class ShadowController extends _ShadowController {

}

export class Controller extends ShadowController {}