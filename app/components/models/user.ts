/// <reference path="../../../lib/app.d.ts" />

'use strict';

class User {

  name: string;
  mobile: string;
  code: string;
  password: string;

  id_card: string;
  realname: string;

  avatar: any;

}

export class Model extends User {}

class Detail {

  marriage_status: string;
  children: string;
  driving_license: any;
  credit: any;
  company_type: string;
  company: string;
  job_title: string;
  degree: string;
  school: string;
  major_in: string;

  static toVO(detail) {
    var vo = angular.copy(detail);
    vo.company = vo.company_name;
    if (vo.children) {
      vo.boy = vo.children.substr(0, 2);
      if (vo.boy == '0男') vo.boy = "";
      vo.girl = vo.children.substr(2, 2);
      if (vo.girl == '0女') vo.girl = "";
    }
    return vo;
  }

  static fromVO(vo) {
    var detail = angular.copy(vo);
    detail.children = (detail.boy || '0男') + (detail.girl || '0女')
    delete detail['boy'];
    delete detail['girl'];
    return detail;
  }

}

export class DetailModel extends Detail {}