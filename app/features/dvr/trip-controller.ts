/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'dvr.TripController';

export class TripController extends BaseController {

  trips;
  paginator;

  selectedTrip;

  static $inject = ['$scope', '$stateParams', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $stateParams, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    super.setModalSrc('map', '/features/dvr/map.html');
  }

  onDay(day) {
    this.utilService.showSpinner();
    this.dvrService.getDailyTrips(day.format('YYYY-MM-DD'), this.$stateParams).then((data) => this.trips = data.data.data.trips).finally(() => this.utilService.hideSpinner());
  }

  deleteTrip(trip) {
    this.utilService.confirm(`您确定要删除 ${trip.start_loc_name + ' 至 ' + trip.end_loc_name} 这段行程吗？`).then((yes) => {
      if (!yes) return;
      this.utilService.showSpinner();
      this.dvrService.deleteTrip(trip.id, this.$stateParams).then((data) => this.paginator.fireOnDay()).finally(() => this.utilService.hideSpinner());
    });
  }

  showMap(trip) {
    this.selectedTrip = trip;
    this.showModal('map');
  }

}

export class Controller extends TripController {}