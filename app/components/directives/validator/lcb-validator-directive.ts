/// <reference path="../../../../lib/app.d.ts" />
'use strict';

import {Validators} from "../../../utility/Validators";

export var directiveName = 'lcbValidator';

class Validator {

  // <modelValue> → ngModelCtrl.$formatters(modelValue) → $viewValue
  //                                                        ↓
  // ↑                                                  $render()
  //                                                        ↓
  // ↑                                                  UI changed
  //                                                        ↓
  // ngModelCtrl.$parsers(newViewValue)    ←    $setViewValue(newViewValue)
  constructor(scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, modelCtrl: angular.INgModelController) {

    //get the regex flags from the regex-validate-flags="" attribute (optional)
    var validator = attrs.lcbValidator;
    if (_.isEmpty(validator)) throw 'lcbValidator must have a validator assigned.';

    // create the regex obj.
    var validatorFn = Validators["is" + _.capitalize(validator)];
    if (!validatorFn) throw "Validator doesn't exist";

    // add a parser that will process each time the value is
    // parsed into the model when the user updates it.
    modelCtrl.$parsers.unshift(function(value) {

      // test and set the validity after update.
      var valid = validatorFn(value);
      modelCtrl.$setValidity(validator, valid);

      // if it's valid, return the value to the model,
      // otherwise return undefined.
      return valid ? value : undefined;

    });

    // add a formatter that will process each time the value
    // is updated on the DOM element.
    modelCtrl.$formatters.unshift(function(value) {

      // validate.
      modelCtrl.$setValidity(validator, validatorFn(value));

      // return the value or nothing will be written to the DOM.
      return value;

    });

  }

}

class ValidatorDirective implements angular.IDirective {

  restrict = 'A';
  require = ['ngModel'];
  link = (scope: angular.IScope, el: angular.IAugmentedJQuery, attrs: any, ctrls) => {
    new Validator(scope, el, attrs, ctrls[0]);
  }

}

export var Directive = [ '$injector', ($injector: angular.auto.IInjectorService) => {
  return $injector.instantiate(ValidatorDirective);
}];