/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');
import {Config} from "../../config/config";

export var serviceName = 'wechatService';

class WechatService extends baseService.Service {

  wechatCache = this.cacheFactory('wechatCache');

  jweixin;

  static $inject = ['$q', '$http', 'CacheFactory', '$window', 'ngAudio', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private cacheFactory, private $window, private ngAudio, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  getJsSDK() {
    return this.$q((resolve, reject) => {
      if (this.jweixin) return resolve(this.jweixin);
      //System.import('jweixin').then((jweixin: any) => {
      this.$q.when(wx).then((jweixin: any) => {
        // 初始化微信 JSSDK
        this._getWeixinConfig().success((data) => {
          jweixin.config(data.config);
          jweixin.ready(() => {
            this.jweixin = jweixin;
            resolve(jweixin);
          });
          jweixin.error((res: any) => {
            alert('微信错误: ' + angular.toJson(res));
            reject(res);
          });
        });
      });
    });
  }

  private _getWeixinConfig() {
    var referer = encodeURIComponent(location.href);
    return this._get(`wxconfig?referer=${referer}`, { cache: this.wechatCache });
  }

  checkJsApi(api) {
    return this.checkJsApis([ api ]);
  }

  checkJsApis(apis) {
    return this.$q((resolve, reject) => {
      this.getJsSDK().then((jweixin: any) => {
        jweixin.checkJsApi({
          jsApiList: apis,
          success: (res) => resolve(res),
          cancel: (res) => reject(res)
        });
      });
    });
  }

  pay(payment, charge) {
    return this.$q((resolve, reject) => {
      pingpp.createPayment(charge, (result, error) => {
        if (result == 'success') return resolve(payment);
        if (result == 'fail') {
          this.utilService.alert(error.msg);
          return reject(payment);
        }
        if (result == 'cancel') return reject(payment);
      });
    });
  }

  onMenuShareTimeline(share) {
    this.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareTimeline(share);
    });
    return this;
  }

  onMenuShareAppMessage(share) {
    this.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareAppMessage(share);
    });
    return this;
  }

  onMenuShareQQ(share) {
    this.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareQQ(share);
    });
    return this;
  }

  getLocation(alwaysResolve = false): angular.IPromise<any> {
    return this.$q((resolve, reject) => {
      this.getWebLocation().then(() => {
        this.getJsSDK().then((jweixin: any) => {
          jweixin.getLocation({
            success: (res) => resolve(res),
            cancel: (res) => {
              if (alwaysResolve) return resolve();
              reject(res);
            },
            error: (res) => {
              alert(angular.toJson(res));
              if (alwaysResolve) return resolve();
              reject(res);
            }
          });
        });
      }, (err) => {
        if (alwaysResolve) return resolve();
        reject(err);
      })
    });
  }

  getWebLocation(alwaysResolve = false) {
    return this.$q((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(position), (err) => {
        if (alwaysResolve) return resolve();
        reject(err);
      });
    });
  }

  takePicture() {
    return this.$q.when(this.chooseImage(1, undefined, ['camera'])).then((res: any) => {
      return this.uploadImage(res.localIds[0]);
    });
  }

  chooseImage(count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) {
    return this.$q((resolve, reject) => {
      this.getJsSDK().then((jweixin: any) => {
        jweixin.chooseImage({
          count,
          sizeType,
          sourceType,
          success: (res) => resolve(res)
        });
      });
    });
  }

  uploadImage(localId, isShowProgressTips = 1) {
    return this.$q((resolve, reject) => {
      this.getJsSDK().then((jweixin: any) => {
        jweixin.uploadImage({
          localId,
          isShowProgressTips,
          success: (res) => resolve(res)
        });
      });
    });
  }

  hideAllNonBaseMenuItem() {
    this.getJsSDK().then((jweixin: any) => jweixin.hideAllNonBaseMenuItem());
  }

  hideMenuItems(menus) {
    this.getJsSDK().then((jweixin: any) => jweixin.hideMenuItems({ menuList: menus }));
  }

  redirectForOpenId(redirect_uri) {
    var url = Config.ssoBaseUrl + '?redirect_uri=' + encodeURIComponent(redirect_uri);
    this.$window.location.replace(url);
  }

  redirectForOpenIdEx(redirect_path) {
    var redirectUri = `${location.origin}${location.pathname}#${redirect_path}`;
    var queryStr = location.href.split('?')[1];
    if (queryStr) redirectUri += '?' + queryStr;
    this.redirectForOpenId(redirectUri)
  }

  subscribed(openid) {
    return this._get(`subscribed?openid=${openid}`);
  }

  shake(time = 1) {
    return this.$q((resolve, reject) => {

      // WebView 不支持摇一摇
      if (!window.DeviceMotionEvent) resolve();

      var handler = (() => {
        var last_x = 0, last_y = 0, last_z = 0;
        var last_update = new Date().getTime();
        var counter = 0;
        return (e: any) => {
          var accel = e.originalEvent.accelerationIncludingGravity;
          var current = new Date().getTime();
          var diffTime = current - last_update;
          if (diffTime < 100) return;
          var speed = Math.abs(accel.x + accel.y + accel.z - last_x - last_y - last_z) / diffTime * 10000;
          if (speed > 1500) {
            counter++;
            this.ngAudio.play(location.origin + '/static/audio/shake.mp3');
            if (counter >= time) resolve();
          }
          last_x = accel.x, last_y = accel.y, last_z = accel.z;
          last_update = current;
        }
      })();

      // WebView 支持摇一摇
      $(window).on('devicemotion', handler);

    });
  }

  speak(textToSpeak) {

    // Create a new instance of SpeechSynthesisUtterance
    var newUtterance = new SpeechSynthesisUtterance();

    newUtterance.pitch = 1;
    newUtterance.rate = 1;
    newUtterance.lang = 'zh-CN';

    // Set the text
    newUtterance.text = textToSpeak;

    // Add this text to the utterance queue
    speechSynthesis.speak(newUtterance);

  }

}

export class Service extends WechatService {}