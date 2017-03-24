/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class TripboxController extends BaseController {

  trip;
  onDelete;
  onMap;

  accePoints;
  brakePoints;
  turnPoints;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    this._prepareTrip();
  }

  private _prepareTrip() {
    var start = parseInt(moment(this.trip.start_epoch_time).format('X')) - 100;
    var end = parseInt(moment(this.trip.end_epoch_time).format('X')) + 100;
    var length = end - start;
    this.accePoints = _.map(this.trip.path_details.acce, (acce: any) => {
      return (acce.ts - start) / length * 100;
    });
    this.brakePoints = _.map(this.trip.path_details.brake, (brake: any) => {
      return (brake.ts - start) / length * 100;
    });
    this.turnPoints = _.map(this.trip.path_details.turn, (turn: any) => {
      return (turn.ts - start) / length * 100;
    });
  }

  deleteTrip() {
    this.onDelete({ trip: this.trip });
  }

  showMap() {
    this.onMap({ trip: this.trip });
  }

}

export class Controller extends TripboxController {}