/// <reference path="../../../lib/app.d.ts" />

'use strict';

import enums = require('../../enums/index');
import models = require("./index");

class Lcb {

  order_id: number;
  name: string;
  id_card: string;
  mobile: string;
  license_no: string;
  city: string;
  city_id: string;
  brand_id: string;
  car_brand: string;
  serie_id: string;
  car_serie: string;
  model_id: string;
  car_model: string;
  engine_no: string;
  vin: string;

  static fromVO(vo: any = {}, carVO = null, pkgVO = null, companyVO = null) {
    var lcb: Lcb = angular.merge({}, vo, models.pkg.Model.fromVO(pkgVO));
    if (angular.isObject(vo.city)) {
      lcb.city = vo.city.name_cn;
      lcb.city_id = vo.city.code;
    }
    if (carVO) {
      lcb.brand_id = <string> _.get(carVO, 'brand.brand_id');
      lcb.car_brand = <string> _.get(carVO, 'brand.name_cn');
      lcb.serie_id = <string> _.get(carVO, 'series.series_id');
      lcb.car_serie = <string> _.get(carVO, 'series.name_cn');
      lcb.model_id = <string> _.get(carVO, 'model.model_id');
      lcb.car_model = <string> _.get(carVO, 'model.name_cn');
    }
    if (pkgVO) {
      lcb['type'] = enums.lcbTypes.LcbTypes[_.capitalize(lcb['type'])] + 1;
    }
    if (companyVO) {
      lcb['company'] = companyVO;
    }
    return lcb;
  }
}

export class Model extends Lcb {}