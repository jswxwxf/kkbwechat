/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

var companyLogos = {
  'picc': '/static/images/ico_p12x.png',
  'clpc': '/static/images/ico_p22x.png',
  'pingan': '/static/images/ico_p32x.png',
  'cpic': '/static/images/ico_p42x.png',
  'taiping': '/static/images/ico_p52x.png',
  'zking': '/static/images/ico_p62x.png',
  'continent': '/static/images/ico_p72x.png'
};

class CompanySelectorController extends BaseController {

  companies;

  static $inject = ['$scope', common.utilService.serviceName, services.commonService.serviceName];

  constructor(private $scope: angular.IScope, private utilService: common.utilService.Service, private commonService: services.commonService.Service) {
    super($scope, utilService);
    this.prepareCompanies($scope['companies']);
  }

  prepareCompanies(companies) {
    if (!companies) return;
    var rows = [];
    var line = [];
    for (var i = 0, l = companies.length; i < l; i++) {
      line.push(companies[i]);
      if ((i + 1) % 3 == 0) {
        rows.push(line);
        line = [];
      }
    }
    if (line.length != 0) rows.push(line);
    this.companies = rows;
  }

}

export class Controller extends CompanySelectorController {}