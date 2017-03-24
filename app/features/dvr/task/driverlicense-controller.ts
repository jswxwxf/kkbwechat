/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";
import {Utils} from "../../../utility/index";

export var controllerName = 'dvr.DriverLicenseController';

export class DriverLicenseController extends BaseController {

  license;

  static $inject = ['$scope', '$state', '$location', 'activeCar', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(private $scope, private $state, private $location, private activeCar, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
    this.activeCar = activeCar.data.data;
  }

  save() {
    var payload = {
      license_driver: { data: this.license.base64, filename: this.license.filename }
    };
    this.utilService.showSpinner();
    this.dvrService.doTaskDriverLicense(payload, this.$location.search()).then(data => {
      this.utilService.alert(data.data.msg).then(data => {
        this.$state.go('dvr2.earning');
      });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends DriverLicenseController {}