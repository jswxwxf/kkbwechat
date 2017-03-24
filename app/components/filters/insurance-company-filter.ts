/// <reference path="../../../lib/app.d.ts" />

'use strict';

import {Companies} from "../../enums/companies";

export var filterName = 'lcbInsuranceCompany';

class InsuranceCompanyFilter {

  static filter() {
    return (input) => {
      return Companies[input];
    };
  }

}

export class Filter extends InsuranceCompanyFilter {}