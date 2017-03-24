/// <reference path="../../../lib/app.d.ts" />

'use strict';

class Car {

  car_id: number;
  license_number: string;
  car_brand: string;
  brand_id: number;
  car_series: string;
  series_id: number;
  car_model: string;
  model_id: number;
  car_vin: string;
  engine_no: string;
  oil_type: string;
  license_vehicle: any;

  static fromVO(vo) {
    var car: Car = angular.copy(vo);
    car.car_brand = <string> _.get(vo, 'car.brand.name_cn', '');
    car.brand_id = parseInt(<string> _.get(vo, 'car.brand.brand_id', '0'));
    car.car_series = <string> _.get(vo, 'car.series.name_cn', '');
    car.series_id = parseInt(<string> _.get(vo, 'car.series.series_id', '0'));
    car.car_model = <string> _.get(vo, 'car.model.name_cn', '');
    car.model_id = parseInt(<string> _.get(vo, 'car.model.model_id', '0'));
    car.oil_type = car.oil_type || '';
    if (angular.isString(car.license_vehicle)) delete car['license_vehicle'];
    delete car['car'];
    return car;
  }

  static fromCar(car: Car) {
    var result = {
      brand: null,
      series: null,
      model: null
    };
    if (car.car_brand) {
      result['brand'] = {
        brand_id: car.brand_id,
        name_cn: car.car_brand
      }
    }
    if (car.car_series) {
      result['series'] = {
        series_id: car.series_id,
        name_cn: car.car_series
      }
    }
    if (car.car_model) {
      result['model'] = {
        model_id: car.model_id,
        name_cn: car.car_model
      }
    }
    return result;
  }

}

export class Model extends Car {}