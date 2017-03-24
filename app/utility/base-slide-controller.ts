/// <reference path="../../lib/app.d.ts" />

'use strict';

import common = require('./index');
import {BaseController} from "./base-controller";

export abstract class BaseSlideController extends BaseController {

  constructor(private $slideScope: angular.IScope, private $slideIonicScrollDelegate, private $slideIonicSlideBoxDelegate, private slideUtilService: common.utilService.Service) {
    super($slideScope, slideUtilService);
  }

  slideChanged() {
    this.$slideIonicScrollDelegate.scrollTop();
  }

  next() {
    this.$slideIonicSlideBoxDelegate.next();
  }

}