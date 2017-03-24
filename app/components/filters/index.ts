/// <reference path="../../../lib/app.d.ts" />

'use strict';

import protectFilter = require('./protect-filter');
import insuranceCoverFilter = require('./insurance-cover-filter');
import insuranceCompanyFilter = require('./insurance-company-filter');
import currencyFilter = require('./currency-filter');
import dateFilter = require('./date-filter');
import statusFilter = require('./status-filter');
import oilFilter = require('./oil-filter')

export var load = (app: angular.IModule) => {
  app.filter(protectFilter.filterName, protectFilter.Filter.filter)
    .filter(insuranceCoverFilter.filterName, insuranceCoverFilter.Filter.filter)
    .filter(insuranceCompanyFilter.filterName, insuranceCompanyFilter.Filter.filter)
    .filter(currencyFilter.filterName, currencyFilter.Filter.filter)
    .filter(dateFilter.filterName, dateFilter.Filter.filter)
    .filter(statusFilter.filterName, statusFilter.Filter.filter)
    .filter(oilFilter.filterName, oilFilter.Filter.filter);
};