/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import enums = require('../../enums/index');

import {RvmwController as _RvmwConroller} from "../../features/welcome/oauth/rvmw-controller";

export var controllerName = 'oauth.RvmwConroller';

class RvmwConroller extends _RvmwConroller {

}

export class Controller extends RvmwConroller {}