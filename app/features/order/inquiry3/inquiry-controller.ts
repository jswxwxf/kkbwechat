/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export let controllerName = 'order.inquiry3.InquiryController';

class InquiryController extends BaseController {

  providers;
  selectedProviders;

  inquiry: any = {
    userId: this.profile.data.data.id
  };

  vehicle;
  insureInfo;

  static $inject = ['$scope', '$state', '$stateParams', 'profile', common.utilService.serviceName, services.commonService.serviceName, services.fanhuaService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private profile, private utilService: common.utilService.Service, private commonService: services.commonService.Service, private fanhuaService: services.fanhuaService.Service) {
    super($scope, utilService);
    // if (this.$stateParams.areaCode && this.$stateParams.inquiry_id) this.loadInquiry();
  }

  loadProviders(areaCode) {
    return this.fanhuaService.getProviders(areaCode).then(resp => {
      this.providers = resp.data.providers;
    });
  }

  // loadInquiry() {
  //   this.utilService.showSpinner();
  //   var areaCode = this.$stateParams.areaCode;
  //   _.set(this.inquiry, 'insureAreaCode.code', areaCode);
  //   var taskId = this.$stateParams.inquiry_id;
  //   this.inquiry.taskId = taskId;
  //   this.loadProviders(areaCode).then(resp => {
  //     return this.fanhuaService.getInquiry(taskId)
  //       .then(resp => {
  //         let inquiry = resp.data.quote;
  //         delete inquiry.insureAreaCode;
  //         inquiry = angular.merge({}, this.inquiry, inquiry);
  //         this.setInquiry(inquiry);
  //       })
  //   }).finally(() => this.utilService.hideSpinner());
  // }

  selectAllProviders() {
    this.selectedProviders = {};
    this.providers.forEach(p => {
      this.selectedProviders[p.prvId] = p.prvName;
    });
  }

  searchInquiry() {
    this.utilService.showSpinner();
    this.loadProviders(this.inquiry.insureAreaCode.code).then(() => {
      if (!_.get(this.inquiry, 'carInfo.carLicenseNo')) {
        return this.$state.go('order.inquiry3.more');
      }
      return this.fanhuaService.searchInquiry(this.inquiry, { errorHandler: err => {
        if (err.code == -1) {
          if (_.get(this.inquiry, 'carOwner.idcardNo')) {
            this.$state.go('order.inquiry3.more');
            return true;
          }
          this.utilService.alert('车辆信息查询失败！请输入身份证进行精确查询。');
          return true;
        }
      }}).then(resp => {
        let inquiry = angular.merge({}, this.inquiry, resp.data);
        this.setInquiry(inquiry);
        this.$state.go('order.inquiry3.more');
      });
    }).finally(() => this.utilService.hideSpinner());
  }

  setInquiry(inquiry) {
    this.selectedProviders = {};
    let prv: any = _.find(this.providers, { prvId: inquiry.prvId });
    if (prv) {
      this.selectedProviders[inquiry.prvId] = prv.prvName;
    }
    if (inquiry.carInfo) {
      inquiry.carInfo.registDate = Utils.toDate(inquiry.carInfo.registDate);
      inquiry.carInfo.transferDate = Utils.toDate(inquiry.carInfo.transferDate);
    }
    if (inquiry.insureInfo) {
      this.insureInfo = angular.copy(inquiry.insureInfo);
      this.insureInfo.bizInsureInfo = this.parseRisks(this.insureInfo.bizInsureInfo);
    }
    this.inquiry = inquiry;
  }

  getInquiry() {
    let inquiry: any = {
      taskId: this.inquiry.taskId,
      insureAreaCode: _.get(this.inquiry, 'insureAreaCode.code'),
      userId: this.inquiry.userId,
      carOwner: this.parseObj(this.inquiry.carOwner),
      remark: this.inquiry.remark,
      providers: _.compact(_.map(this.selectedProviders, (v, prvId) => {
        if (!v) return;
        return { prvId }
      })),
      providerNames: _.reduce(this.selectedProviders, (result, v, k) => {
        if (!v) return result;
        result[k] = v;
        return result;
      }, {})
    };
    let carInfo: any = this.parseObj(this.inquiry.carInfo);
    if (carInfo) {
      delete carInfo.vehicleName;
      if (this.vehicle) carInfo.vehicleId = this.vehicle.vehicleId;
      if (!carInfo.carLicenseNo) {
        delete carInfo.carLicenseNo;
        carInfo.isNew = 'Y';
      }
      inquiry.carInfo = carInfo;
    }
    let insure = this.parseInsure();
    if (!_.isEmpty(insure)) inquiry.insureInfo = insure;
    return inquiry;
  }

  parseRisks(insureInfo) {
    if (!insureInfo) return insureInfo;
    if (!insureInfo.riskKinds) return insureInfo;
    let risks = {};
    insureInfo.riskKinds.forEach(r => {
      risks[r.riskCode] = r;
    });
    insureInfo.riskKinds = risks;
    return insureInfo;
  }

  resolveRisks() {
    let insures = [];
    _.forOwn(this.insureInfo.bizInsureInfo.riskKinds, (v, k) => {
      let risk: any = angular.copy(v);
      risk.riskCode = k;
      if (!risk.amount || risk.amount == 0) return;
      delete risk.premium;
      delete risk.ncfPremium;
      delete risk.riskName;
      insures.push(risk);
    });
    return insures;
  }

  parseInsure() {
    let insure: any = {};
    if (this.insureInfo.efcInsure == 'true') {
      insure.efcInsureInfo = this.parseObj(this.insureInfo.efcInsureInfo);
      insure.taxInsureInfo = {
        isPaymentTax: 'Y'
      }
    }
    let risks = this.resolveRisks();
    if (!_.isEmpty(risks)) {
      insure.bizInsureInfo = this.parseObj(this.insureInfo.bizInsureInfo);
      insure.bizInsureInfo.riskKinds = risks;
    }
    return insure;
  }

  parseObj(obj) {
    let result = {};
    angular.forEach(obj, (v, k) => {
      if (v === undefined) return;
      if (_.includes(['amount', 'premium'], k)) return;
      if (_.includes(v, '*')) return;
      if (angular.isDate(v)) { result[k] = Utils.formatDate(v); return; }
      result[k] = v;
    });
    if (_.isEmpty(result)) return;
    return result;
  }

  enable(which) {
    if (which == 'idcardNo') {
      return _.isEmpty(_.get(this.inquiry, 'taskId'));
    }
    if (which == 'price') {
      if (!_.get(this.inquiry, 'carInfo.carLicenseNo')) return true;
      let registDate = _.get(this.inquiry, 'carInfo.registDate');
      if (!registDate) return false;
      return moment(registDate).isAfter(moment().subtract(9, 'M'));
    }
    return false;
  }

  updateBasic() {
    if (this.vehicle) this.inquiry.carInfo.vehicleName = this.vehicle.vehicleName;
    this.$state.go('order.inquiry3.insurance');
  }

  cantQuote() {
    return _.reduce(this.selectedProviders, (count, v, k) => {
      if (v === false) return count;
      return count + 1;
    }, 0) == 0;
  }

  commitInquiry() {
    this.utilService.hideToast();
    let inquiry = this.getInquiry();
    if (!inquiry.insureInfo) return this.utilService.alert('请配置保险组合。');
    this.utilService.showSpinner();
    this.fanhuaService.submitInquiry(inquiry, { errorHandler: this.errorHandler.bind(this) }).then(resp => {
      this.$state.go('order.fanhua', { inquiry_id: resp.data.taskId });
    }).finally(() => this.utilService.hideSpinner());
  }

  errorHandler(err) {
    if (err.code == -1) {
      let msg = Utils.fromJson(err.msg);
      if (Utils.isEmpty(msg)) return false;
      this.utilService.toast(_.values(msg).join('<br/>'), { position: 'top', stick: true });
      return true;
    }
  }

}

export class Controller extends InquiryController {}