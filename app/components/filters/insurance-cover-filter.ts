/// <reference path="../../../lib/app.d.ts" />

'use strict';

export var filterName = 'lcbInsuranceCover';

var cover = '<span class="lcb-insurance-cover">投保</span>';
var notcover = '<span class="lcb-insurance-not-cover">不投保</span>';

class InsuranceCoverFilter {

  static $inject = ['$filter'];

  static filter($filter) {
    return (input, option) => {

      if (angular.isUndefined(input)) return input;

      // 处理 true/false
      if (input == 'true' || input === true) return cover;
      if (input == 'false' || input === false) return notcover;
      if (input === '') return notcover;
      if (input == 0) return notcover;

      // 处理玻璃破损险
      if (angular.isString(input) && /玻璃/.test(input)) {
        return '<span class="lcb-insurance-cover">{input}</span>'.replace('{input}', input);
      }
      // 处理后视镜和车灯险
      if (angular.isString(input) && /进口|出口/.test(input)) {
        return '<span class="lcb-insurance-cover">{input}</span>'.replace('{input}', input);
      }

      return $filter('lcbCurrency')(input, { shorter: true, color: 'reverse', fractionSize: 0 });

    };
  }

}

export class Filter extends InsuranceCoverFilter {}