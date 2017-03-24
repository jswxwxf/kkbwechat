/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {InviteController} from "../../features/user/invite/invite-controller";

export var controllerName = 'invite.inviteController';

class EventInviteController extends InviteController {

  listSref = 'invite.list';
  
}

export class Controller extends EventInviteController {}