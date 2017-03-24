/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');


class BehaviourScoreLoader {

  _options: any = {
    responsive: true,
    animation: false,
    scaleShowGridLines: false,
    // scaleShowVerticalLines: false,
    // scaleFontSize: 0,
    // scaleLineColor: "transparent",
    // scaleGridLineColor: "rgba(255,255,255,0.5)",
    datasetFill: true,
    pointDotRadius: 1,
    // pointDotStrokeWidth: 0.5,
    datasetStrokeWidth: 1,
    bezierCurve: false,
    // scaleOverride: true,
    scaleFontColor: "rgba(255,255,255,0.8)",
    // scaleSteps: 1,
    // scaleStartValue: 0,
    // scaleStepWidth: 100,
    // barValueSpacing: 2,
    barDatasetSpacing: 5,
    // barShowStroke: false,
    // scaleShowLabels: false,
    showTooltips: false,
    // tooltipEvents: ["touchstart", "touchmove"],
  };

  constructor(private scope: any, private attrs: any, private utilService: common.utilService.Service, private carService: services.carService.Service) {}

  load() {

    this.scope.behaviourScoreChartOptions = this._options;

    // TODO：ugly fix 因为没有办法设置 isolate scope 只能从父 scope 里得到数据
    this.scope.$watch('ctrl.chartData', (newValue) => {
      if (!newValue) return;
      this._loadChartData(newValue);
    });

    this.scope.$watch('ctrl.option', (newValue) => {
      if (!newValue) return;
      if (newValue.value == 7) {
        delete this._options.barValueSpacing;
        this._options.barShowStroke = true;
        return;
      }
      if (newValue.value == 30) {
        this._options.barValueSpacing = 2;
        this._options.barShowStroke = false;
        return;
      }
    });

  }

  private _loadChartData(chartData) {
    var labels = _.fill(Array(chartData.behaviors.length), '');
    this.scope.behaviourScoreChartData = {
      labels,
      datasets : [
        {
          fillColor: "rgba(255,255,255,0.5)",
          strokeColor: "rgba(225,225,225,1)",
          pointColor: "rgba(225,225,225,1)",
          // pointStrokeColor: "#fff",
          data: chartData.behaviors
        }
      ]
    };
  }


}

export class Loader extends BehaviourScoreLoader {}