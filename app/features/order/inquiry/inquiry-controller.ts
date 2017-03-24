/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.inquiry.InquiryController';

class InquiryController extends BaseController {

  inquiry: any = {
    quote_id: this.$stateParams.inquiry_id,   // 重新报价用
    name: this.profile.data.data.realname,
    id_card: this.profile.data.data.id_card,
    product_id: this.$stateParams.product_id,
    license_no: this.activeCar.data.data.license_no
  };

  pendingInquiries;

  products;
  credit;
  pkg;

  license_vehicle: any = {};

  static $inject = ['$scope', '$state', '$stateParams', 'cities', 'profile', 'activeCar', 'companies', common.utilService.serviceName, services.commonService.serviceName, services.inquiryService.serviceName, services.insuranceService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private cities, private profile, private activeCar, private companies, private utilService: common.utilService.Service, private commonService: services.commonService.Service, private inquiryService: services.inquiryService.Service, private insuranceService: services.insuranceService.Service) {
    super($scope, utilService);
    this.cities = cities.data.data;
    this.activeCar = activeCar.data.data;
    var code = { code: '310100' };
    if ($stateParams.city) {
      code = { code: $stateParams.city };
      this.inquiry.city = _.find(this.cities, code);
    }
    // 重新报价用
    if (companies) {
      this.companies = companies.data.data;
      this.inquiry.company = Utils.first(this.companies);
    }
    this.loadProducts(code);
    if (!$stateParams.inquiry_id) this.getPendingInquiries();
    this.$scope.$watch(() => this.inquiry.city, this.loadProducts.bind(this));
  }

  getPendingInquiries() {
    this.utilService.showSpinner();
    this.inquiryService.inquiryList().then(resp => {
      this.pendingInquiries = _.filter(resp.data.data, (inquiry: any) => {
        return _.includes([5, 6, 7], inquiry.status);
      });
      if (this.pendingInquiries.length > 0) {
        this.utilService.confirm('', `您有 <span class="assertive">${this.pendingInquiries.length}</span> 条报价信息待处理`,
          { okText: '查看', cancelText: '关闭', cancelType: 'button-light' }).then((yes) => {
          if (yes) this.$state.go('inquiry.list');
        });
      }
    }).finally(() => this.utilService.hideSpinner());
  }

  loadProducts(city) {
    if (!city) return;
    this.utilService.showSpinner();
    this.inquiryService.getProducts(city.code).success((data) => {
      this.products = data.data;
      if (_.find(this.products.products, { product_id: parseInt(this.inquiry.product_id) })) return;  // 从外部转入
      this.inquiry.product_id = null;
      if (this.products.products.length == 1) this.inquiry.product_id = Utils.first(this.products.products).product_id; // 只有一个产品，直接选中
    }).finally(() => this.utilService.hideSpinner());
  }

  createInquiry() {
    this.utilService.showSpinner();
    this.inquiryService.inquiryBasic(this.inquiry).success((data) => {
      if (!data.data.pass) {
        return this.utilService.alert('所输车牌无对应驾驶评级，无法购买优选和惠选车险。');
      }
      this.prepareMore(data.data.vehicle);
      this.$state.go('order.inquiry.more');
    }).finally(() => this.utilService.hideSpinner());
  }

  prepareMore(vehicle) {
    var data: any = _.pick(vehicle, 'car_vin', 'engine_no');
    this.license_vehicle = {
      front: vehicle.license_vehicle,
      back: vehicle.license_vehicle_back
    };
    data.car_brand = _.compact([vehicle.car_brand, vehicle.car_model, vehicle.car_series]).join(' ');
    data.register_date = Utils.toDate(vehicle.registered_on);
    data.transfer_date = Utils.toDate(vehicle.issued_on);
    angular.merge(this.inquiry, data);
  }

  validateMore() {
    if (this.inquiry.city.code == '310100') return true;  // 当城市为上海时，可以不填信息直接过
    if (this.license_vehicle.front) return true;  // 行驶证照片已经读取或上传（只监控正面）
    // 车架号、发动机号和注册日期这三项已经填写
    if (_.isEmpty(this.inquiry.car_vin)) return false;
    if (_.isEmpty(this.inquiry.engine_no)) return false;
    if (!this.inquiry.register_date) return false;
    return true;
  }

  saveMore() {
    if (!this.validateMore()) {
      return this.utilService.alert('您可以选择“上传行驶证照片”或“直接手动填写信息”', { title: '信息不完整无法报价~~~' });
    }
    this.utilService.showSpinner();
    this.inquiryService.inquiryMore(this.inquiry).success((data) => {
      this.companies = data.data;
      this.inquiry.company = Utils.first(this.companies);
      this.credit = data.credit;
      this.$state.go('order.inquiry.insurance');
    }).finally(() => this.utilService.hideSpinner());
  }

  commitInquiry() {
    this.utilService.showSpinner();
    this.inquiryService.commitInquiry(this.getInquiry()).success((data) => this.$state.go('order.result', { inquiry_id:  data.data.id })).finally(() => this.utilService.hideSpinner());
  }

  getInquiry() {

    var payload: any = angular.copy(this.inquiry);
    payload = angular.extend(payload, this.pkg);
    payload.company = this.inquiry.company.company_id;
    if (payload.quote_id) return payload; // 重新报价只要最后一页保险公司和险种信息就可以了

    delete payload.type;
    payload.license_vehicle_front = Utils.toImageData(this.license_vehicle.front, true);
    payload.license_vehicle_back = Utils.toImageData(this.license_vehicle.back, true);
    payload.city = this.inquiry.city.name_cn;
    payload.city_id = this.inquiry.city.code;
    payload.register_date = Utils.formatDate(this.inquiry.register_date);
    payload.transfer_date = Utils.formatDate(this.inquiry.transfer_date);
    return payload;

  }

}

export class Controller extends InquiryController {}