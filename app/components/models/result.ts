/// <reference path="../../../lib/app.d.ts" />

'use strict';

class Result {

  success: boolean;
  code: number;
  msg: string;
  error: string;
  errors: any[];

  status_code: number;
  message: string;

}

export class Model extends Result {}