/// <reference path="../../../lib/app.d.ts" />
'use strict';

import {Utils} from "../../utility/index";

class Pkg {

  "type": string;
  "destroy": boolean;
  "liability": number;
  "stolen": number;
  "passenger_seat": number;
  "driver_seat": number;
  "scratch": number;
  "glasses": string;
  "water": boolean;
  "burn": boolean;
  "excluding": boolean;
  "escape": boolean;

  static isValid(pkg: Pkg) {
    return !(
      angular.isUndefined(pkg.destroy) ||
      angular.isUndefined(pkg.liability) ||
      angular.isUndefined(pkg.stolen) ||
      angular.isUndefined(pkg.passenger_seat) ||
      angular.isUndefined(pkg.driver_seat) ||
      angular.isUndefined(pkg.scratch) ||
      angular.isUndefined(pkg.glasses) ||
      angular.isUndefined(pkg.water) ||
      angular.isUndefined(pkg.burn) ||
      angular.isUndefined(pkg.excluding)) ||
      angular.isUndefined(pkg.escape);
  }

  static fromVO(vo) {
    if (!vo) return vo;
    return {
      "type": vo.type,
      "destroy": Utils.parseBool(vo.destroy),
      "liability": parseInt(vo.liability),
      "stolen": Utils.parseBool(vo.stolen),
      "passenger_seat": parseInt(vo.passenger_seat),
      "driver_seat": parseInt(vo.driver_seat),
      "scratch": parseInt(vo.scratch),
      "glasses": vo.glasses,
      "water": Utils.parseBool(vo.water),
      "burn": Utils.parseBool(vo.burn),
      "excluding": Utils.parseBool(vo.excluding),
      "escape": Utils.parseBool(vo.escape)
    };
  }

}

export class Model extends Pkg {}