/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class CarSelectorController extends BaseController {

  car = {
    brand: null,
    series: null,
    model: null
  };

  private brandMap;
  private series;
  private modelMap;
  private disabled;

  static $inject = ['$scope', common.utilService.serviceName, services.commonService.serviceName];

  constructor(public $scope, private utilService: common.utilService.Service, private commonService: services.commonService.Service) {
    super($scope, utilService);
    super.setModalSrc('brand', '/components/directives/car-selector/brand.html');
    super.setModalSrc('series', '/components/directives/car-selector/series.html');
    super.setModalSrc('model', '/components/directives/car-selector/model.html');
    this.disabled = !!$scope['disabled'];
    if ($scope.brands) this.brandMap = _.groupBy($scope.brands, 'py');
  }

  showBrandModal() {
    if (this.isDisabled()) return;
    if (this.brandMap) return this.showModal('brand');
    this.utilService.showSpinner();
    this.commonService.getBrands().success((data) => {
      this.brandMap = _.groupBy(data.data, 'py');
      this.showModal('brand');
    }).finally(() => this.utilService.hideSpinner());
  }

  setBrand(brand) {
    this.car.brand = brand;
    this.setSeries(null);
  }

  showSeriesModal() {
    if (this.isDisabled(this.car.brand)) return;
    if (this.series) return this.showModal('series');
    this.utilService.showSpinner();
    this.commonService.getSeries(this.car.brand.brand_id).success((data) => {
      this.series = data.data;
      this.showModal('series');
    }).finally(() => this.utilService.hideSpinner());
  }

  setSeries(series) {
    this.car.series = series;
    if (!series) this.series = null;
    this.setModel(null);
  }

  showModelModal() {
    if (this.isDisabled(this.car.series)) return;
    if (this.modelMap) return this.showModal('model');
    this.utilService.showSpinner();
    this.commonService.getModel(this.car.series.series_id).success((data) => {
      this.modelMap = _.groupBy(data.data, 'years');
      this.showModal('model');
    }).finally(() => this.utilService.hideSpinner());
  }

  setModel(model) {
    this.car.model = model;
    if (!model) this.modelMap = null;
  }

  isDisabled(val?) {
    if (this.disabled) return true;
    if (arguments.length == 0) return false;
    return _.isEmpty(val);
  }

}

export class Controller extends CarSelectorController {}