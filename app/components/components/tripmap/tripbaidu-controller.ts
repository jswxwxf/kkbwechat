/// <reference path="../../../../lib/app.d.ts" />

'use strict';

// <script src="http://api.map.baidu.com/api?v=2.0&ak=RGR2MY9wr6PjcgZwoc1i1dZkAckEcLEu"></script>

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class TriBaiduController extends BaseController {

  trip;
  map;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
  }

  private _initMap() {

    // Fix cannot read property 'offsetLeft' of null issue.
    $('.lcb-tripmap').parents('.modal-backdrop').css('position', 'absolute');
    $('.lcb-tripmap').parents('.modal-backdrop-bg').css('position', 'absolute');

    var map = new BMap.Map($('.lcb-tripmap>div')[0]); // 创建地图实例
    var point = new BMap.Point(121.48, 	31.22);  // 创建点坐标
    map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
    map.addControl(new BMap.NavigationControl({ anchor: 0 /* BMAP_ANCHOR_TOP_LEFT */ }));

    this.map = map;

    this._renderLegend(map);
    this._renderTrip();

  }

  private _renderLegend(map) {

    function LegendControl() {
      // 设置默认停靠位置和偏移量
      this.defaultAnchor = 3;
      this.defaultOffset = new BMap.Size(10, 10);
    }
    LegendControl.prototype = new BMap.Control();
    LegendControl.prototype.initialize = function(map){
      var $div = $(`
        <div class="legend">
          <img src="/static/images/dvr/icon_start.png"> 起点 <br>
          <img src="/static/images/dvr/ico_sudden_acce.png"> 急加速 <br>
          <img src="/static/images/dvr/ico_sudden_brake.png"> 急减速 <br>
          <img src="/static/images/dvr/ico_sudden_turn.png"> 急转弯 <br>
          <img src="/static/images/dvr/icon_end.png"> 终点 <br>
        </div>
      `);
      var div = $div[0];
      map.getContainer().appendChild(div);
      return div;
    };
    map.addControl(new LegendControl());

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
    var points = _.map(line, (n: any) => new BMap.Point(n[1], n[0]));
    this.map.addOverlay(new BMap.Polyline(points));

    points = [new BMap.Point(trip.start_loc_lon, trip.start_loc_lat), new BMap.Point(trip.end_loc_lon, trip.end_loc_lat)];
    this.map.addOverlay(new BMap.Marker(points[0]));
    this.map.addOverlay(new BMap.Marker(points[1]));
    setTimeout(() => this.map.setViewport(points), 0);

    // if (!trip.path_details) return;
    // this._renderPoints(trip.path_details.acce, this.markers.suddenAcce);
    // this._renderPoints(trip.path_details.brake, this.markers.suddenBrake);
    // this._renderPoints(trip.path_details.turn, this.markers.suddenTurn);

  }

  private _renderPoints(points, icon) {
  }

  private _clearMap() {
    this.map.clearOverlays();
  }

}

export class Controller extends TriBaiduController {}