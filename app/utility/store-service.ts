/// <reference path="../../lib/app.d.ts" />

'use strict';

import {Utils} from "./index";
import {Config} from "../config/config";

export var serviceName = 'storeService';

class StoreService {

  private _temp: any = {};

  static $inject = ['$q', '$rootScope', '$localStorage'];

  constructor(private $q: angular.IQService, private $rootScope: angular.IRootScopeService, private $localStorage) {}

  storeTemp(k, val) {
    this._temp[k] = val;
  }

  getTemp(k) {
    return this._temp[k];
  }

  deleteTemp(k) {
    delete this._temp[k];
  }

  getToken() {
    return this.$localStorage.token;
  }

  setToken(token) {
    this.$localStorage.token = token;
  }

  deleteToken() {
    delete this.$localStorage.token;
  }

  storeItem(k, val) {
    this.$localStorage[k] = val;
  }

  getItem(k) {
    return this.$localStorage[k];
  }

  deleteItem(k) {
    delete this.$localStorage[k];
  }

}

export class Service extends StoreService {}
