/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'user.grade.GradeController';

class GradeController extends BaseController {

  gradeStatus;
  chartData;

  static $inject = ['$scope', '$q', '$state', 'activeCar', 'grade', common.utilService.serviceName, services.carService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $q: angular.IQService, private $state, private activeCar, private grade, private utilService: common.utilService.Service, private carService: services.carService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    super.setModalSrc('hint', '/features/user/reward/assess-hint.html');
    this.activeCar = activeCar.data.data;
    this._setGrade(grade.data);
  }

  loadGrade(car_id) {
    this.utilService.showSpinner();
    this.userService.getGrade(car_id).then((data) => {
      this._setGrade(data.data);
    }).finally(() => this.utilService.hideSpinner());
  }

  private _setGrade(data) {
    this.grade = data.data;
    this.chartData = this.grade;    // TODO：ugly fix 因为没有办法设置 isolate scope 只能从父 scope 里得到数据
    //delete this.grade.score1;
    //delete this.grade.score2;
    //delete this.grade.score3;
    if (_.isEmpty(this.grade)) return this.gradeStatus = 'start';
    if (this.grade.score3) return this.gradeStatus = 'done';
    this.gradeStatus = 'inprogress';
  }

  getGradeImage() {
    var score = this.grade.score3.toLowerCase();
    return `static/images/grades/${score}.png`;
  }

  downloadApp() {
    location.assign(`//www.kaikaibao.com.cn/app/download/`);
  }

  gotoReport() {
    if (!this.grade.stage) return;
    this.$state.go('user.grade.report', { stage: this.grade.stage });
  }

}

export class Controller extends GradeController {}