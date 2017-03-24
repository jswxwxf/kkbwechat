/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {DvrController as _DvrController} from "../../features/dvr/dvr-controller";

export var controllerName = 'dvr.DvrController';

class DvrController extends _DvrController {

}

export class Controller extends DvrController {}