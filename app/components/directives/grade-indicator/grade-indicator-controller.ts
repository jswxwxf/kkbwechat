/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

class GradeIndicatorController extends BaseController {

  grade;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this.setGrade();
  }

  setGrade() {
    this.grade = this.$scope['grade'] || {};
  }

  getProgressImage() {
    if (!this.grade.score1) return '/static/images/grades/0-30.png';
    if (this.grade.score2) return '/static/images/grades/60-90.png';
    if (this.grade.score1) return '/static/images/grades/30-60.png';
    return '/static/images/grades/90.png';
  }

}

export class Controller extends GradeIndicatorController {}