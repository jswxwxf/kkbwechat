/// <reference path="../../lib/app.d.ts" />

'use strict';

var _isGreen = _.startsWith(location.host, 'green.');

var _isStaging = /\.test\./.test(location.host) || /\.lichengbao\./.test(location.host);

var _ssoUrl = _isStaging ? 'http://api-test.lichengbao.com.cn/1.0/wxauth' : 'https://api.kaikaibao.com.cn/1.0/wxauth';

if (_.startsWith(location.host, 'localhost')) _ssoUrl = 'http://api-test.lichengbao.com.cn/1.0/fake/wxauth';  // 方便在电脑上测试

var _ssoBaseUrl = _isStaging ? 'http://api-test.lichengbao.com.cn/1.0/wxbase' : 'http://api.kaikaibao.com.cn/1.0/wxbase';

export abstract class Config {

  static baseUrl = `//${location.host}`;

  static ssoUrl = _ssoUrl;

  static ssoBaseUrl = _ssoBaseUrl;

  static getStoragePrefix = () => `${location.hostname}-`;

  static launchOptions: any = {};

  static _inEvent = false;

  static welcomePage = () => {
    if (_isGreen) {
      return 'features/welcome/green/welcome.html';
    }
    return 'features/welcome/welcome.html';
  };

  static productPage = () => {
    if (_isGreen) {
      return 'features/insurance/product/green/product.html';
    }
    return 'features/insurance/product/product.html';
  };

  static isGreen() {
    return _isGreen;
  }

  static isStaging() {
    return _isStaging;
  }

  static inWechat() {
    return /MicroMessenger/i.test(navigator.userAgent);
  }

  static inEvent() {
    return Config._inEvent;
  }

  static isFullscreen() {
    return Config.launchOptions.fullscreen == 'true';
  }

  static isPhantomState = (state: angular.ui.IState) => {
    return _.includes([
      'login', 'signup', 'forget',
      'user.car.add', 'user.car.edit', 'order.quote.license',
      'order.pay',
      'oauth.detail', 'oauth.bind', 'oauth.rvm', 'oauth.rvmw', 'oauth.read',
      'token'
    ], state.name);
  }

}
