/// <reference path="../../../lib/app.d.ts" />

'use strict';

import services = require('../../components/services/index');

export var filterName = 'lcbOil';

class OilFilter {

  static $inject = [services.commonService.serviceName];

  static filter(commonService: services.commonService.Service) {
    return (input) => {

      var oil = _.find(commonService.getOilsSync(), { oil_id: input });
      if (oil) return [ oil.oil_type, oil.name_cn ].join('');

      return input;

    };
  }

}

export class Filter extends OilFilter {}