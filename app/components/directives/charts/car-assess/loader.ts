/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');


class CarAssessLoader {

  _options: any = {
    responsive: true,
    pointDot: false,
    showTooltips: false,
    scaleOverride: true,
    scaleSteps: 1,
    scaleStartValue: 0,
    scaleStepWidth: 100
  };

  constructor(private scope: any, private attrs: any, private utilService: common.utilService.Service, private carService: services.carService.Service) {}

  load() {

    if (this.attrs['hideLabel'] == 'true') {
      this._options.pointLabelFontColor = 'transparent';
    }
    if (this.attrs['type'] == 'auto') {
      this._options.scaleLineColor = 'rgba(255, 255, 255, 0.7)';
    }
    this.scope.chartOptions = this._options;

    var data: any = {
      fillColor: 'rgba(220, 220, 220, 0.5)',
      data: [0, 0, 0, 0, 0]
    }

    this.scope.chartData = {
      labels: ['驾驶习惯', '驾驶路线', '驾驶里程', '身份特质', '驾驶时间'],
      datasets: [ data ]
    };

    if (this.attrs['chartSize'] == 'large') {
      this._options.showTooltips = true;
      this._options.pointLabelFontSize = 14;
      data.fillColor = 'rgba(50, 219, 250, 0.5)';
      data.strokeColor = 'rgba(50, 219, 250, 1)';
    }

    if (this.attrs['example'] == 'true') {
      this.scope.chartData.datasets[0].data = [ 80, 70, 70, 65, 90 ];
      return;
    }
    // TODO：ugly fix 因为没有办法设置 isolate scope 只能从父 scope 里得到数据
    var assess = this.scope.ctrl.chartData;
    if (assess) {
      this.scope.chartData.datasets[0].data = this._toChartArray(assess);
      return;
    }
    this.utilService.showSpinner();
    this.carService.getActiveCarAssess().then((data) => {
      var assess = data.data.data;
      this.scope.chartData.datasets[0].data = this._toChartArray(assess);
    }).finally(() => this.utilService.hideSpinner());

  }

  private _toChartArray(assess) {
    return [
      parseInt(assess.driving_habit || '0'),
      parseInt(assess.driving_routine || '0'),
      parseInt(assess.driving_mileage || '0'),
      parseInt(assess.identity || '0'),
      parseInt(assess.driving_experience || '0')
    ]
  }


}

export class Loader extends CarAssessLoader {
}