/// <reference path="../../../lib/app.d.ts" />
'use strict';

import common = require('../../utility/index');
import config = require('./../../config/config');

abstract class BaseService {

  private _config = config.Config;

  static $inject = ['$q', '$http', common.utilService.serviceName];
  
  constructor(private __$q: angular.IQService, private __$http: angular.IHttpService, public __utilService) {}

  _getOptions(opts?) {
    if (!opts) opts = {};
    if (!opts.headers) opts.headers = {};
    var headers = this._getHeaders(opts.headers);
    if (this.__utilService.getToken()) headers['Authorization'] = `Bearer ${this.__utilService.getToken()}`;
    return angular.extend(opts || {}, { headers } );
  }

  _getHeaders(headers = {}) {
    var defaults = {
      'x-from': 'html5'
    };
    return angular.extend(defaults, headers);
  }
  
  _get(url, opts?): angular.IHttpPromise<any> {
    return this.__$http.get(this._processUrl(url), this._getOptions(opts));
  }

  _post(url, data, opts?): angular.IHttpPromise<any> {
    return this.__$http.post(this._processUrl(url), data, this._getOptions(opts));
  }

  _put(url, data, opts?): angular.IHttpPromise<any> {
    return this.__$http.put(this._processUrl(url), data, this._getOptions(opts));
  }

  _delete(url, opts?): angular.IHttpPromise<any> {
    return this.__$http.delete(this._processUrl(url), this._getOptions(opts));
  }

  private _processUrl(url) {
    return `${this._config.baseUrl}/api/${url}`;
  }

  _dget(url, opts?): angular.IHttpPromise<any> {
    return this.__$http.get(this._processDUrl(url), this._getOptions(opts));
  }

  _dpost(url, data, opts?): angular.IHttpPromise<any> {
    return this.__$http.post(this._processDUrl(url), data, this._getOptions(opts));
  }

  _dput(url, data, opts?): angular.IHttpPromise<any> {
    return this.__$http.put(this._processDUrl(url), data, this._getOptions(opts));
  }

  _ddelete(url, opts?): angular.IHttpPromise<any> {
    return this.__$http.delete(this._processDUrl(url), this._getOptions(opts));
  }

  private _processDUrl(url) {
    return `${this._config.baseUrl}/dapi/${url}`;
  }
  
}

export class Service extends BaseService {}