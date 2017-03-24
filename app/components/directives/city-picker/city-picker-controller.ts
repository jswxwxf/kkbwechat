/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class CityPickerController extends BaseController {

  source;
  provinces;
  cities;
  citiesCache = [];

  selectedProvince;
  selectedCity;

  picker;

  mapper = (c: any) => { return { text: c.name_cn, value: c.code, parent: c.parent_code } };

  static $inject = ['$scope', '$timeout', common.utilService.serviceName, services.commonService.serviceName];

  constructor(public $scope, private $timeout, private utilService: common.utilService.Service, private commonService: services.commonService.Service) {
    super($scope, utilService);
  }

  private _getProvinces() {
    this.utilService.showSpinner();
    return this.commonService.getRegions().then(resp => {
      this.source = resp.data.data;
      this.provinces = _.map(_.filter(this.source, (p: any) => p.parent_code == 0), this.mapper);
      this._getCities(this.provinces[0].value);
    }).finally(() => this.utilService.hideSpinner());
  }

  private _getCities(p_code) {
    if (this.citiesCache[p_code]) {
      this.cities = this.citiesCache[p_code];
      return;
    }
    this.cities = _.map(_.filter(this.source, (c: any) => c.parent_code == p_code), this.mapper);
    this.citiesCache[p_code] = this.cities;
  }

  private _showPicker() {
    if (this.picker) return this.picker.show();
    var picker = new Picker({
      data: [this.provinces, this.cities],
      selectedIndex: [0, 0],
      title: '请选择城市'
    });
    picker.on('picker.change', this._onPickerChange.bind(this));
    picker.on('picker.select', this._onPickerSelect.bind(this));
    picker.show();
    this.picker = picker;
  }

  private _onPickerChange(index, selectIndex) {
    if (index != 0) return;
    this._getCities(this.provinces[selectIndex].value);
    this.picker.refillColumn(1, this.cities);
  }

  private _onPickerSelect(selectedVal, selectedIndex) {
    this.$scope.$apply(() => {
      this.selectedProvince = this.transfer(this.provinces[selectedIndex[0]]);
      this.selectedCity = this.transfer(this.cities[selectedIndex[1]]);
      // 如果还没滚动完成就点击“确定”，就有可能还没有执行 change 事件，所以需要手动执行。
      if ((!this.selectedCity) || this.selectedCity.parent_code != this.selectedProvince.code) {
        this._onPickerChange(0, selectedIndex[0]);
        this.selectedCity = this.transfer(this.cities[0]);
      }
    });
  }

  transfer(from) {
    if (!from) return from;
    return {
      name_cn: from.text,
      code: from.value,
      parent_code: from.parent
    };
  }

  getDisplayText() {
    if (!this.selectedCity) return '请点击选择城市';
    return `${this.selectedProvince.name_cn} - ${this.selectedCity.name_cn}`;
  }

  showPicker() {
    if (this.source) return this._showPicker();
    this._getProvinces().then(() => this._showPicker());
  }

}

export class Controller extends CityPickerController {}