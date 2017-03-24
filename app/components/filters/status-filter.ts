/// <reference path="../../../lib/app.d.ts" />

'use strict';

export var filterName = 'lcbStatus';

class StatusFilter {

  static filter() {
    return (input, options) => {

      options = angular.merge({
        successLabel: '正常',
        errorLabel: '不正常',
        type: 'bool',
        color: true
      }, options || {});

      if (options.type == 'object') {
        input = !_.isEmpty(input);
      }

      if (angular.isUndefined(input)) return input;

      if (!_.isBoolean(input)) {
        input = !!parseInt(input);
      }

      if (input) {
        input = options.color ? '<span class="balanced">{status}</span>'.replace('{status}', options.successLabel) : options.successLabel;
      } else {
        input = options.color ? '<span class="assertive">{status}</span>'.replace('{status}', options.errorLabel) : options.errorLabel;
      }

      return input;

    };
  }

}

export class Filter extends StatusFilter {}