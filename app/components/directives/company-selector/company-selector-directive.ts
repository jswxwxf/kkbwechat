/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import services = require('../../services/index');

export var directiveName = 'companySelector';

import controller = require('./company-selector-controller');

class CompanySelectorDirective implements angular.IDirective {

  restrict = 'E';
  scope = {
    companies: '='
  };

  templateUrl = 'components/directives/company-selector/company-selector.html';
  replace = true;

  require = 'ngModel';
  controller = controller.Controller;
  controllerAs = 'ctrl';

  static $inject = [ services.commonService.serviceName ];

  constructor(private commonService: services.commonService.Service) {}

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link(scope: any, el: angular.IAugmentedJQuery, attrs: any, modelCtrl) {

    var companyMap = _.indexBy(scope['companies'], 'company_id');

    var unselectAll = () => {
      el.find('.lcb-company-selector').css('visibility', 'hidden');
    };

    var select = (el: any) => {
      unselectAll();
      el.find('.lcb-company-selector').css('visibility', 'visible');
    };

    scope.selectCompany = (company_id) => {
      if (!company_id) return;
      select(el.find('#' + company_id));
      modelCtrl.$setViewValue(companyMap[company_id]);
    };

    // add validation
    modelCtrl.$parsers.push(function(viewValue) {
      modelCtrl.$setValidity('required', !_.isEmpty(viewValue));
      return viewValue;
    });

    modelCtrl.$render = function () {
      if (modelCtrl.$viewValue == null) {
        setTimeout(() => unselectAll(), 0);
        return modelCtrl.$setViewValue(null);
      }
      setTimeout(() => select(el.find(`.lcb-company-logo-${modelCtrl.$viewValue.company_id}`)), 0);
    };

  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(CompanySelectorDirective);
}];