/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import {TokenController as _TokenController} from "../../features/welcome/oauth/token-controller";

export var controllerName = 'oauth.TokenController';

class TokenController extends _TokenController {

}

export class Controller extends TokenController {}