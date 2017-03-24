/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import enums = require('../../../enums/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

const GlassInsAmount = {
  '1.00': '国产玻璃',
  '2.00': '进口玻璃'
};

class PackageViewerController extends BaseController {

  package;

  static $inject = ['$scope', common.utilService.serviceName];

  constructor(public $scope: angular.IScope, private utilService: common.utilService.Service) {
    super($scope, utilService);
  }

  getRiskAmount(risk) {
    if (Utils.in([
        'WadingIns', 'CombustionIns', 'VehicleDemageMissedThirdPartyCla',
        'VehicleTaxOverdueFine', 'CarToCarDamageIns', 'CombustionExclusionCla', 'WadingExclusionCla',
        'OptionalDeductiblesCla', 'AccidentDeductiblesCla', 'NewEquipmentIns', 'LossOfBaggageIns',
        'TrainnigCarCla', 'NcfDriverPassengerIns', 'SpecifyingPlantCla', 'VehicleSuspendedIns',
        'NcfBasicClause', 'NcfAddtionalClause', 'NcfClause'], risk.riskCode)) {
      return '投保';
    }
    if (risk.riskCode == 'GlassIns') return GlassInsAmount[risk.amount];
    return risk.amount;
  }

  getRiskPrice(risk) {
    return parseFloat(risk.premium || 0) + parseFloat(risk.ncfPremium || 0);
  }

}

export class Controller extends PackageViewerController {}