/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');
import {Config} from "../../config/config";

export var serviceName = 'jsBridgeService';

class JsBridgeService extends baseService.Service {

  private _jsBridge;

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  getJsBridge() {
    return this.$q((resolve, reject) => {
      if (window['JSBridge'] == undefined) {
        // this.utilService.alert('JSBridge 没有定义!');
        return reject('JSBridge 没有定义!');
      }
      if (this._jsBridge) return resolve(this._jsBridge);
      this.$q.when(JSBridge).then((JSBridge: IJSBridgeClass) => {
        if (JSBridge) {
          JSBridge.init((message) => {
            // this.utilService.alert('init message: ' + angular.toJson(message));
          });
          this._jsBridge = JSBridge;
          return resolve(JSBridge);
        }
        $(document).on('JSBridgeReady', () => {
          this._jsBridge = JSBridge;
          JSBridge.init((message) => {
            // this.utilService.alert(message + ' isReady');
          });
          resolve(JSBridge);
        });
      });
    });
  }

  send(eventName, data) {
    return this.$q((resolve, reject) => {
      this.getJsBridge().then((jsBridge: IJSBridgeClass) => {
        jsBridge.send(eventName, data, (resp) => resolve(resp));
      });
    });
  }

  callAPI(name, data?) {
    return this.$q((resolve, reject) => {
      this.getJsBridge().then((jsBridge: IJSBridgeClass) => {
        // this.utilService.alert('API ' + name + ' called');
        jsBridge.callAPI(name, data, (resp) => {
          // this.utilService.alert('resp: ' + angular.toJson(resp));
          resolve(resp);
        });
      });
    });
  }

  reset() {
    this.callAPI('NativeJsMethod.reset');
  }

  share(config) {
    this.callAPI('NativeJsMethod.share', config);
  }

}

export class Service extends JsBridgeService {}