/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

// override MapBox to provide retina tiles
L.TileLayer.Provider.providers.MapBox = {
  url: `//api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}${(L.Browser.retina ? '@2x.png' : '.png')}?access_token={accessToken}`,
  options: {
    attribution: '',
    subdomains: 'abcd'
  }
};

class TripmapController extends BaseController {

  trip;
  map;

  bounds;

  providers = {

    // gaode: L.layerGroup([L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    //   maxZoom: 18,
    //   minZoom: 5
    // })]),

    mapbox: L.layerGroup([L.tileLayer.provider('MapBox', {
      maxZoom: 18,
      minZoom: 5,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    })])

  };

  markers = {
    start: L.icon({ iconUrl: '/static/images/dvr/icon_start.png', iconSize: [12, 17]}),
    end: L.icon({ iconUrl: '/static/images/dvr/icon_end.png', iconSize: [12, 17]}),
    suddenAcce: L.icon({ iconUrl: '/static/images/dvr/ico_sudden_acce.png', iconSize: [10, 10] }),
    suddenBrake: L.icon({ iconUrl: '/static/images/dvr/ico_sudden_brake.png', iconSize: [10, 10] }),
    suddenTurn: L.icon({ iconUrl: '/static/images/dvr/ico_sudden_turn.png', iconSize: [10, 10] })
  };

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service) {
    super($scope, utilService);
    // $scope.$on('modal.shown', () => {
    //   if (this.bounds) this.map.fitBounds(this.bounds);
    // });
  }

  private _initMap() {

    // var baseLayers = {
    //   "MapBox": this.providers.mapbox,
    //   "高德": this.providers.gaode
    // };

    var map = L.map($('.lcb-tripmap>div')[0], {
      center: [31.22, 121.50],
      zoom: 12,
      layers: [this.providers.mapbox],
      zoomControl: false
    });

    // L.control.layers(baseLayers, null).addTo(map);
    L.control.zoom({
      zoomInTitle: '放大',
      zoomOutTitle: '缩小'
    }).addTo(map);

    this.map = map;

    this._renderLegend(map);
    this._renderTrip();

  }

  private _renderLegend(map) {

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = map => {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += `
        <img src="/static/images/dvr/icon_start.png"> 起点 <br>
        <img src="/static/images/dvr/ico_sudden_acce.png"> 急加速 <br>
        <img src="/static/images/dvr/ico_sudden_brake.png"> 急减速 <br>
        <img src="/static/images/dvr/ico_sudden_turn.png"> 急转弯 <br>
        <img src="/static/images/dvr/icon_end.png"> 终点 <br>
      `;
      return div;
    };

    legend.addTo(map);

  }

  $onInit() {
    this._initMap();
  }

  $onChanges() {
    this._renderTrip();
  }

  $onDestroy() {
    this.map.remove();
    this.map = null;
  }

  private _renderTrip() {

    var trip = this.trip;

    this._clearMap();
    if (_.isEmpty(trip.path)) return this.utilService.alert('没有行程数据');
    var line = polyline.decode(trip.path);
    var r = L.polyline(line).addTo(this.map);
    this.bounds = r.getBounds();
    this.map.fitBounds(this.bounds);

    L.marker([trip.start_loc_lat, trip.start_loc_lon], { icon: this.markers.start }).addTo(this.map);
    L.marker([trip.end_loc_lat, trip.end_loc_lon], { icon: this.markers.end }).addTo(this.map);

    if (!trip.path_details) return;
    this._renderPoints(trip.path_details.acce, this.markers.suddenAcce);
    this._renderPoints(trip.path_details.brake, this.markers.suddenBrake);
    this._renderPoints(trip.path_details.turn, this.markers.suddenTurn);

  }

  private _renderPoints(points, icon) {
    if (!points) return;
    angular.forEach(points, p => {
      L.marker([p.lat, p.lng], { icon }).addTo(this.map);
    });
  }

  private _clearMap() {
    this.bounds == null;
    var map = this.map;
    map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline) { layer.remove(); return; }
      if (layer instanceof L.Marker) { layer.remove(); return; }
    });
  }

}

export class Controller extends TripmapController {}