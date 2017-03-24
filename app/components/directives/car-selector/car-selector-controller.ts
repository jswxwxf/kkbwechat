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

  query: any = {
    brand: undefined,
    serie: undefined,
    model: undefined
  };

  static $inject = ['$q', '$scope', '$filter', '$ionicScrollDelegate', common.utilService.serviceName, services.commonService.serviceName];

  constructor(private $q: angular.IQService, public $scope, private $filter: angular.IFilterService, private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate, private utilService: common.utilService.Service, private commonService: services.commonService.Service) {
    super($scope, utilService);
    super.setModalSrc('brand', '/components/directives/car-selector/brand.html');
    super.setModalSrc('series', '/components/directives/car-selector/series.html');
    super.setModalSrc('model', '/components/directives/car-selector/model.html');
    this.disabled = !!$scope['disabled'];
  }

  reset() {
    this.$ionicScrollDelegate.scrollTop();
    this.query = {};
  }

  showBrandModal() {
    if (this.isDisabled()) return;
    this.reset();
    if (this.brandMap) return this.showModal('brand');
    this.$q.when(this.$scope.brands).then((brands) => {
      if (brands) return brands;
      this.utilService.showSpinner();
      return this.commonService.getBrands().finally(() => this.utilService.hideSpinner());
    }).then((brands) => {
      if (brands.data) brands = brands.data.data;
      this.queryBrand(brands);
      this.showModal('brand');
    });
  }

  queryBrand(brands) {
    this.$scope.$watch(() => this.query.brand, (newValue) => {
      this.$ionicScrollDelegate.scrollTop(true);
      var result = brands;
      if (!_.isEmpty(newValue)) {
        result = this.$filter('filter')(brands, newValue);
      }
      this.brandMap = _.groupBy(result, 'py');
    })
  }

  setBrand(brand) {
    this.car.brand = brand;
    this.setSeries(null);
  }

  showSeriesModal() {
    if (this.isDisabled(this.car.brand)) return;
    this.reset();
    if (this.series) return this.showModal('series');
    this.utilService.showSpinner();
    this.commonService.getSeries(this.car.brand.brand_id).success((data) => {
      this.querySerie(data.data);
      this.showModal('series');
    }).finally(() => this.utilService.hideSpinner());
  }

  querySerie(series) {
    this.$scope.$watch(() => this.query.serie, (newValue) => {
      this.$ionicScrollDelegate.scrollTop(true);
      this.series = this.$filter('filter')(series, newValue);
    })
  }

  setSeries(series) {
    this.car.series = series;
    if (!series) this.series = null;
    this.setModel(null);
  }

  showModelModal() {
    if (this.isDisabled(this.car.series)) return;
    this.reset();
    if (this.modelMap) return this.showModal('model');
    this.utilService.showSpinner();
    this.commonService.getModel(this.car.series.series_id).success((data) => {
      this.queryModel(data.data);
      this.showModal('model');
    }).finally(() => this.utilService.hideSpinner());
  }

  queryModel(model) {
    this.$scope.$watch(() => this.query.model, (newValue) => {
      this.$ionicScrollDelegate.scrollTop(true);
      var result = model;
      if (!_.isEmpty(newValue)) {
        result = this.$filter('filter')(model, newValue);
      }
      this.modelMap = _.groupBy(result, 'years');
    })
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