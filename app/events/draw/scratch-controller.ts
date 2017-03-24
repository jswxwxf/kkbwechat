/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {ScratchDrawController} from "../../features/share/draw/scratch-controller";

export var controllerName = 'draw.ScratchDrawController';

class EventScratchDrawController extends ScratchDrawController {

  historyState = 'draw.scratch.history';

}

export class Controller extends EventScratchDrawController {}