/// <reference path="../../../lib/app.d.ts" />

'use strict';

import {Validators} from "../../utility/Validators";

export var filterName = 'lcbProtect';

class ProtectFilter {

  static filter() {
    return (input) => {
      if (Validators.isIdCard(input)) {
        return input.replace(/.{4}$/, '****');
      }
      if (Validators.isMobile(input)) {
        return input.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      }
      return input;
    };
  }

}

export class Filter extends ProtectFilter {}