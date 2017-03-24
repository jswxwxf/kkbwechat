/// <reference path="../../../lib/app.d.ts" />

'use strict';

import {Utils} from "../../utility/index";

class Compensate {

  order_id: string;
  name: string;
  id_card: string;
  mobile: string;
  engine_no: string;
  stoped_on: any;
  stoped_cert: any;
  forfeit_cert: any;
  status: string;
  validate_from: any;
  validate_to: any;
  final_amount: number;
  license_no: string;

  static toClaim(compensate: Compensate) {
    return {
      "order_id": compensate.order_id,
      "name": compensate.name,
      "id_card": compensate.id_card,
      "engine_no": compensate.engine_no,
      "stoped_on": Utils.formatDate(compensate.stoped_on),
      "stoped_cert": Utils.toImageData(compensate.stoped_cert),
      "forfeit_cert": Utils.toImageData(compensate.forfeit_cert)
    }
  }

  static toVO(compensate: Compensate) {
    var vo = angular.copy(compensate);
    vo.stoped_on = new Date(vo.stoped_on);
    return vo;
  }

}

export class Model extends Compensate {}