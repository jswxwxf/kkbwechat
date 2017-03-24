/// <reference path="../../lib/app.d.ts" />

'use strict';

const ID_CARD_REGEXP_15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
const ID_CARD_REGEXP_18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[X0-9]{1}$/i;
const MOBILE_REGEXP = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
const LICENSE_NUMBER_REGEXP = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[-]?[A-Z_0-9]{5}$/i;
const VERIFY_CODE_REGEXP = /^[0-9]{6}$/;
const USERNAME_REGEXP = /^[A-Z][A-Z0-9]{3,19}$/i;
const PASSWORD_REGEXP = /^[A-Z0-9]{6,20}$/i;
const NAME_REGEXP = /^[\u4e00-\u9fa5]{2,20}/;
const POSTAL_REGEXP = /^\d{6}$/;

export abstract class Validators {

  static isIdCard(id: string): boolean {
    return (ID_CARD_REGEXP_15.test(id) || ID_CARD_REGEXP_18.test(id));
  }

  static isMobile(mobile: string): boolean {
    return MOBILE_REGEXP.test(mobile);
  }

  static isLicenseNumber(license: string): boolean {
    return LICENSE_NUMBER_REGEXP.test(license);
  }

  static isVerifyCode(code: string): boolean {
    return VERIFY_CODE_REGEXP.test(code);
  }

  static isUsername(username: string): boolean {
    return USERNAME_REGEXP.test(username);
  }

  static isPassword(passwd: string): boolean {
    return PASSWORD_REGEXP.test(passwd);
  }

  static isName(name: string): boolean {
    return NAME_REGEXP.test(name);
  }

  static isPostal(postal: string): boolean {
    return POSTAL_REGEXP.test(postal);
  }

}
