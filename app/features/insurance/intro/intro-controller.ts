/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'insurance.intro.introController';

export class IntroController extends BaseController {

  currentSlide;   // 0 based

  static $inject = ['$scope', '$ionicSlideBoxDelegate', common.utilService.serviceName];

  constructor(protected $scope, private $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate, protected utilService: common.utilService.Service) {
    super($scope, utilService);
    setTimeout(() => $ionicSlideBoxDelegate.update(), 100);
  }

  slideChanged(index) {
    this.currentSlide = index;
  }

  handleSwitch(slide) {
    this.$ionicSlideBoxDelegate.slide(slide);
    setTimeout(() => this.$ionicSlideBoxDelegate.stop(), 1000);
  }

}

export class Controller extends IntroController {}