/// <reference path="../../../lib/app.d.ts" />

'use strict';

import {Utils} from "../../utility/index";

export var filterName = 'lcbCurrency';

class CurrencyFilter {

  static $inject = ['$filter'];

  static filter($filter) {
    return (input, options?) => {

      options = angular.merge({ removeZero: true }, options || {});

      if (options.processing) {
        if (angular.isUndefined(options.processingStatus)) {
          if (Utils.isEmpty(input)) return options.processing;
        }
        if (!_.includes([5, 9], options.processingStatus)) {
          return options.processing;
        }
      }

      if (Utils.isEmpty(input)) {
        return input;
      }

      if (input == 'true' || input == 'false') return input;

      // 转成数字
      if (!angular.isNumber(input)) {
        if (options.type == 'float') {
          input = parseFloat(input);
          options['fractionSize'] = 2;
        } else {
          input = parseInt(input);
          options['fractionSize'] = 0;
        }
      }

      if (input == 0 && options.removeZero) return;

      var result = input;

      // 50000 => 5万
      if (options.shorter) {
        if (input > 10000) result /= 10000;
      }

      if (options.floor) {
        result = Math.floor(result);
      }

      var result = $filter('currency')(result, '', options.fractionSize);

      if (options.shorter) {
        if (input > 10000) result += '万';
      }

      if (options.yuan) {
        result += '元'
      }

      // 添加正负号
      if (options.sign == 1) {
        result = '+' + result;
      } else if (options.sign == 0) {
        input = -input;
        result = '-' + result;
      } else if (options.sign) {
        if (input > 0) result = '+' + result;
      }

      // 添加颜色
      if (options.color) {
        var plusColor = "assertive", minusColor = "balanced";
        if (options.color == 'reverse') plusColor = "balanced", minusColor = "assertive";
        if (input > 0) {
          result = $('<span class="' + plusColor + '"></span>').text(result)[0].outerHTML;
        } else {
          result = $('<span class="' + minusColor + '"></span>').text(result)[0].outerHTML;
        }
      }

      return result;

    };
  }

}

export class Filter extends CurrencyFilter {}