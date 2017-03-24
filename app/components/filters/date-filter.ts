/// <reference path="../../../lib/app.d.ts" />

'use strict';

import {Utils} from "../../utility/index";

export var filterName = 'lcbDate';

class DateFilter {

  static $inject = ['$filter'];

  static filter($filter) {
    return (input, format) => {
      if (!input) return input;
      return Utils.formatDate(input, format);
    };
  }

}

export class Filter extends DateFilter {}