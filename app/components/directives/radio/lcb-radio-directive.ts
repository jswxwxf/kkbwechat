/// <reference path="../../../../lib/app.d.ts" />
'use strict';

export var directiveName = 'lcbRadio';

class RadioDirective implements angular.IDirective {

  restrict = 'E';
  //scope = {
  //  options: '=lcbOptions'
  //};

  templateUrl = 'components/directives/radio/lcb-radio.html';
  replace = true;

  require = '?ngModel';
  transclude = true;
  //controller = controller.Controller;
  //controllerAs = 'ctrl';

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any) => {}

  compile = (element, attr) => {

    if (attr.icon) {
      var iconElm = element.find('i');
      iconElm.removeClass('ion-checkmark').addClass(attr.icon);
    }

    var input = element.find('input');
    angular.forEach({
      'name': attr.name,
      'value': attr.value,
      'disabled': attr.disabled,
      'ng-value': attr.ngValue,
      'ng-model': attr.ngModel,
      'ng-disabled': attr.ngDisabled,
      'ng-change': attr.ngChange,
      'ng-required': attr.ngRequired,
      'required': attr.required
    }, function (value, name) {
      if (angular.isDefined(value)) {
        input.attr(name, value);
      }
    });

    return function (scope, el, attrs) {
      scope.getValue = () => {
        return scope.ngValue || attr.value;
      };
    };

  }

}


export var Directive = ['$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(RadioDirective);
}];