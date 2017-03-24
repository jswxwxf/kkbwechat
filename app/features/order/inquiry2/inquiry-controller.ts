/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {Utils} from "../../../utility/index";
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'order.inquiry2.InquiryController';

class InquiryController extends BaseController {

	insurance;
	cities;

	static $inject = ['$scope', '$state', 'data', common.utilService.serviceName, services.commonService.serviceName, services.insuranceService.serviceName];

	constructor(private $scope, private $state, private data, private utilService: common.utilService.Service, private commonService: services.commonService.Service, private insuranceService: services.insuranceService.Service) {
		super($scope, utilService);
		this.cities = data.cities.data.data;
		$scope.$watch('ctrl.insurance.city', this.cityChanged.bind(this));
	}

	cityChanged(newVal, oldVal) {
		if(newVal) {
			this.insurance.license_no = newVal.prefix;
		}
	}

	basicSubmitted() {
		let data = angular.copy(this.insurance);
		data.city_id = this.insurance.city.code;
		delete data.city;
		this.insuranceService.axaQuoteBasic(data)
			.success(() => this.$state.go('order.inquiry2.more'))
			.finally(() => this.utilService.hideSpinner());
	}

	moreSubmitted() {
		this.utilService.showSpinner();
		let data = angular.copy(this.insurance);
		if(data.city != undefined) {
			data.city_id = this.insurance.city.code;
			delete data.city;
		}
		this.insuranceService.axaQuoteMore(data)
			.success(() => this.$state.go('order.inquiry2.insurance'))
			.finally(() => this.utilService.hideSpinner());
	}

	insuranceSubmitted() {
		this.utilService.showSpinner();
		let data = angular.copy(this.insurance);
		data.city_id = this.insurance.city.code;
		delete data.city;
		this.insuranceService.axaQuoteResult(data)
			.success(() => {
				this.$state.go('order.inquiry2.result');
			})
			.finally(() => this.utilService.hideSpinner());
	}
}

export class Controller extends InquiryController {}