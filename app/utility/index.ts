/// <reference path="../../lib/app.d.ts" />

'use strict';

export import utilService = require('./util-service');
export import storeService = require('./store-service');

import baseController = require('./base-controller');
import {Config} from "../config/config";

export abstract class Utils {

  static fromJson(val) {
    try {
      return angular.fromJson(val);
    } catch (e) {
      return {};
    }
  }

  static parseBool(val, defVal = false) {
    if (angular.isUndefined(val)) return defVal;
    if (val == 'true') return true;
    return false;
  }

  static toImageData(image, ignoreStr = false) {
    if (_.isEmpty(image)) return null;
    if (!image.base64) return ignoreStr ? null : image;
    return {
      data: image.base64,
      filename: image.filename
    }
  }

  static parseInt(val) {
    return parseInt(val);
  }

  static parseFloat(val) {
    var res = parseFloat(val);
    if (_.isNaN(res)) return val;
    return res;
  }

  static isEmpty(val) {
    if (_.isNumber(val) && val != 0) return false;
    return _.isEmpty(val);
  }

  static in(collection, value) {
    return _.includes(collection, value);
  }

  parseInt(val) {
    return Utils.parseInt(val);
  }

  static first(obj) {
    if (angular.isArray(obj)) return _.first(obj);
    return obj;
  }

  static toLower(str) {
    if (!angular.isString(str)) return str;
    return str.toLowerCase();
  }

  static toArray(obj) {
    if (angular.isArray(obj)) return obj;
    return [obj];
  }

  static toDate(str) {
    if (!str) return str;
    return moment(str).toDate();
  }

  static formatDate(dt, format = 'YYYY-MM-DD') {
    if (!dt) return dt;
    return moment(dt).format(format);
  }

  static formatTime(dt) {
    if (!dt) return dt;
    return moment(dt).format('HH:mm:ss');
  }

  static formatPeriod(from, to) {
    if (!from) return '';
    if (!to) return '';
    return `${from} 至 ${to}`;
  }

  static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
  }

  /**
   * Convert number of seconds into time object
   *
   * @param integer secs Number of seconds to convert
   * @return object
   */
  static secondsToTime(secs) {

    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    return {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    
  }

  static mockReturn(ret?) {
    var data = {};
    data['data'] = {};
    data['data']['data'] = ret;
    return data;
  }
  
  static formatDuration(duration, opt = { h: true, m: true, s: true }) {
    var formatted = '';
    duration = Utils.secondsToTime(duration);
    if (opt.h && duration.h > 0) formatted += `${duration.h}小时`;
    if (opt.m && duration.m > 0) formatted += `${duration.m}分`;
    if (opt.s && duration.s > 0) formatted += `${duration.s}秒`;
    return formatted;
  }


  /**
   * Convert base64 string to array buffer.
   *
   * @param {string} base64
   * @returns {object}
   */
  static base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Reorient specified element.
   *
   * @param {number} orientation
   * @param {object} element
   * @returns {undefined}
   */
  static reOrient(orientation, element) {
    switch (orientation) {
      case 1:
        // No action needed
        break;
      case 2:
        element.css({
          '-moz-transform': 'scaleX(-1)',
          '-o-transform': 'scaleX(-1)',
          '-webkit-transform': 'scaleX(-1)',
          'transform': 'scaleX(-1)',
          'filter': 'FlipH',
          '-ms-filter': "FlipH"
        });
        break;
      case 3:
        element.css({
          'transform': 'rotate(180deg)'
        });
        break;
      case 4:
        element.css({
          '-moz-transform': 'scaleX(-1)',
          '-o-transform': 'scaleX(-1)',
          '-webkit-transform': 'scaleX(-1)',
          'transform': 'scaleX(-1) rotate(180deg)',
          'filter': 'FlipH',
          '-ms-filter': "FlipH"
        });
        break;
      case 5:
        element.css({
          '-moz-transform': 'scaleX(-1)',
          '-o-transform': 'scaleX(-1)',
          '-webkit-transform': 'scaleX(-1)',
          'transform': 'scaleX(-1) rotate(90deg)',
          'filter': 'FlipH',
          '-ms-filter': "FlipH"
        });
        break;
      case 6:
        element.css({
          'transform': 'rotate(90deg)'
        });
        break;
      case 7:
        element.css({
          '-moz-transform': 'scaleX(-1)',
          '-o-transform': 'scaleX(-1)',
          '-webkit-transform': 'scaleX(-1)',
          'transform': 'scaleX(-1) rotate(-90deg)',
          'filter': 'FlipH',
          '-ms-filter': "FlipH"
        });
        break;
      case 8:
        element.css({
          'transform': 'rotate(-90deg)'
        });
        break;
    }
  }

}

export var load = (app: angular.IModule) => {

  app.service(utilService.serviceName, utilService.Service)
    .service(storeService.serviceName, storeService.Service)
    .run(['$rootScope', 'utilService', ($rootScope, utilService) => {
      $rootScope.parseBool = Utils.parseBool;
      $rootScope.lcbUtils = Utils;
      $rootScope.isEmpty = _.isEmpty;
    }]);

  app.config(['$ionicConfigProvider', '$localStorageProvider', 'CacheFactoryProvider', ($ionicConfigProvider, $localStorageProvider, CacheFactoryProvider) => {

    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.tabs.position("bottom"); // Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style("standard"); // Makes them all look the same across all OS
    $ionicConfigProvider.navBar.alignTitle("center");

    $localStorageProvider.setKeyPrefix(Config.getStoragePrefix());

    angular.extend(CacheFactoryProvider.defaults, {
      maxAge: 15 * 60 * 1000,   // 15 分钟过期
      deleteOnExpire: 'passive'
    });

  }]);

  app.run(['$rootScope', '$window', utilService.serviceName, ($rootScope, $window, utilService: utilService.Service) => {
    
    // 更新微信标题
    if (Config.inWechat() && ionic.Platform.isIOS()) {
      $rootScope.$watch(() => document.title, (newValue, oldValue) => {
        if (!newValue) return;  // 还没有标题, 不需要更新
        if (newValue == oldValue) return; // 标题没有变化, 不需要更新
        setTimeout(() => {
          var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', () =>
            setTimeout(() => $iframe.off('load').remove(), 0)
          ).appendTo($('body'));
        }, 500);    // 延时半秒, 防止影响其他js运行
      });
    }

    $rootScope.$on('$stateChangeStart', () => {
      utilService.hideToast();
    });

    $window.addEventListener('offline', () => {
      utilService.showSpinner('您的手机目前没有网络');
    });
    $window.addEventListener('online', () => {
      utilService.hideSpinner();
    });

  }]);

};