/// <reference path="../../../../lib/app.d.ts" />

'use strict';

// <script src="http://webapi.amap.com/maps?v=1.3&key=c6711ddd3730f2651bfa80864b1b49c6"></script>

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class TripGaodeController extends BaseController {

  trip;
  map;

  markers = {
    start: new AMap.Icon({ image: `/static/images/dvr/icon_start.png`, size: new AMap.Size(12, 17), imageSize: new AMap.Size(12, 17) }),
    end: new AMap.Icon({ image: `/static/images/dvr/icon_end.png`, size: new AMap.Size(12, 17), imageSize: new AMap.Size(12, 17) }),
    suddenAcce: new AMap.Icon({ image: `/static/images/dvr/ico_sudden_acce.png`, size: new AMap.Size(10, 10), imageSize: new AMap.Size(10, 10) }),
    suddenBrake: new AMap.Icon({ image: `/static/images/dvr/ico_sudden_brake.png`, size: new AMap.Size(10, 10), imageSize: new AMap.Size(10, 10) }),
    suddenTurn: new AMap.Icon({ image: `/static/images/dvr/ico_sudden_turn.png`, size: new AMap.Size(10, 10), imageSize: new AMap.Size(10, 10) })
  };

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
  }

  private _initMap() {

    var map = new AMap.Map($('.lcb-tripmap>div')[0], {
      resizeEnable: true,
      zoom:11,
      center: [121.4, 31.2]
    });

    map.plugin(["AMap.ToolBar"], function() {
      map.addControl(new AMap.ToolBar());
    });

    map.setMapStyle('blue_night');

    this.map = map;

    this._renderTrip();

  }

  private _renderLegend(map) {

  }

  $onInit() {
    this._initMap();
  }

  $onChanges() {
    this._renderTrip();
  }

  $onDestroy() {
    this.map = null;
  }

  private _renderTrip() {

    var trip = this.trip;

    this._clearMap();
    if (_.isEmpty(trip.path)) return this.utilService.alert('没有行程数据');
    var line = polyline.decode(trip.path);
    new AMap.Polyline({ path: _.map(line, (n: any) => n.reverse()), strokeColor: 'lightgreen' }).setMap(this.map);
    this.map.setFitView();

    new AMap.Marker({ position: [trip.start_loc_lon, trip.start_loc_lat], icon: this.markers.start, offset: new AMap.Pixel(-10, -10) }).setMap(this.map);
    new AMap.Marker({ position: [trip.end_loc_lon, trip.end_loc_lat], icon: this.markers.end, offset: new AMap.Pixel(-10, -10) }).setMap(this.map);

    if (!trip.path_details) return;
    this._renderPoints(trip.path_details.acce, this.markers.suddenAcce);
    this._renderPoints(trip.path_details.brake, this.markers.suddenBrake);
    this._renderPoints(trip.path_details.turn, this.markers.suddenTurn);

  }

  private _renderPoints(points, icon) {
    if (!points) return;
    angular.forEach(points, p => {
      new AMap.Marker({ position: [p.lng, p.lat], icon, offset: new AMap.Pixel(-5, -5) }).setMap(this.map);
    });
  }

  private _clearMap() {
    this.map.clearMap();
  }

}

export class Controller extends TripGaodeController {}