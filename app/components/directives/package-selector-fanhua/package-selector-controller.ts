/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

class PackageSelectorController extends BaseController {

  insureInfo: any = {
    efcInsure: 'false',
    bizInsureInfo: {
      riskKinds: {
        VehicleDemageIns: {
          amount: '0',
          notDeductible: 'N'
        },
        ThirdPartyIns: {
          amount: '0',
          notDeductible: 'N'
        },
        TheftIns: {
          amount: '0',
          notDeductible: 'N'
        },
        DriverIns: {
          amount: '0',
          notDeductible: 'N'
        },
        PassengerIns: {
          amount: '0',
          notDeductible: 'N'
        },
        ScratchIns: {
          amount: '0',
          notDeductible: 'N'
        },
        GlassIns: {
          amount: '0',
          notDeductible: 'N'
        },
        WadingIns: {
          amount: '0',
          notDeductible: 'N'
        },
        CombustionIns: {
          amount: '0',
          notDeductible: 'N'
        },
        VehicleDemageMissedThirdPartyCla: {
          amount: '0',
          notDeductible: 'N'
        },
        SpecifyingPlantCla: {
          amount: '0',
          notDeductible: 'N'
        },
        CompensationForMentalDistressIns: {
          amount: '0',
          notDeductible: 'N'
        }
      }
    }
  };

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(private $scope, private utilService) {
    super($scope, utilService);
    $scope.$watch('ctrl.insureInfo.efcInsureInfo.startDate', this.efcStartDateChanged.bind(this));
    $scope.$watch('ctrl.insureInfo.bizInsureInfo.startDate', this.bizStartDateChanged.bind(this));
  }

  efcStartDateChanged(newVal, oldVal) {
    if (newVal == oldVal) return;
    this.insureInfo.efcInsureInfo.endDate = moment(this.insureInfo.efcInsureInfo.startDate).add(1, 'y').toDate();
  }

  bizStartDateChanged(newVal, oldVal) {
    if (newVal == oldVal) return;
    this.insureInfo.bizInsureInfo.endDate = moment(this.insureInfo.bizInsureInfo.startDate).add(1, 'y').toDate();
  }

  setInsureInfo(insureInfo) {
    this.insureInfo = angular.merge(this.insureInfo, insureInfo);
    this.insureInfo.efcInsure = !_.isEmpty(this.insureInfo.taxInsureInfo) + '';
    this.insureInfo.efcInsureInfo = this.parseRange(this.insureInfo.efcInsureInfo);
    this.insureInfo.bizInsureInfo = this.parseRange(this.insureInfo.bizInsureInfo);
  }

  parseRange(range: any = {}) {
    // range.startDate = Utils.toDate(range.startDate);
    // range.endDate = Utils.toDate(range.endDate);
    // if (!range.startDate) {
      range.startDate = moment().add(1, 'd').toDate();
      range.endDate = moment().add(1, 'y').toDate();
    // }
    return range;
  }

}

export class Controller extends PackageSelectorController {}