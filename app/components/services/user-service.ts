/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'userService';

class UserService extends baseService.Service {

  userCache = this.cacheFactory('userCache');

  static $inject = ['$q', '$http', 'CacheFactory', common.utilService.serviceName, common.storeService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private cacheFactory, private utilService: common.utilService.Service, private storeService: common.storeService.Service) {
    super($q, $http, utilService);
  }

  sendRegisterCode(mobile) {
    return this._post('send/register', { mobile: mobile });
  }

  sendResetCode(mobile) {
    return this._post('send/resetpassword', { mobile: mobile });
  }

  sendChangeMobileCode(mobile) {
    return this._post('send/mobile', { mobile: mobile });
  }

  register(user) {
    return this._post('register', user).success((data) => {
      this._setToken(data.token);
    });
  }

  registerSSO(user) {
    return this._post('register/sso', user, this._getTempTokenHeader());
  }

  bindSSO(user) {
    return this._post('bind/sso', user, this._getTempTokenHeader()).success((data) => {
      // bind/sso 会产生新的 token, 因为用户变了
      this._setToken(data.token);
    });
  }

  sendRvmCode(mobile) {
    return this._post('send/rvmreg', { mobile: mobile });
  }

  registerRvm(user) {
    return this._post('register/rvmuser', user, this._getTempTokenHeader());
  }

  registerRvmw(user) {
    return this._post('register/rvmuserw', user, this._getTempTokenHeader());
  }

  registerReader(user) {
    return this._post('register/reader', user, this._getTempTokenHeader());
  }

  private _getTempTokenHeader() {
    return {
      'headers': super._getHeaders({ 'Authorization': `Bearer ${this.storeService.getTemp('token')}` })
    }
  }

  login(user, opts?) {
    return this._post('login', user, opts).success((data) => {
      this._setToken(data.token);
    });
  }

  // 测试用代码，不要调动
  loginSSO() {
    return this._post('login/sso', {
      "platformName": 'wxsession', // qq or wxsession
      'accessToken': '2.00L543xCzS3VyD3ed7f89d7c6M77XE',
      'iconURL': 'http://tp4.sinaimg.cn/2709402615/180/5737742435/1',
      'userName': '找不到好的ID',
      'usid': Date.now()
    }).success((data) => {
      this._setToken(data.token);
    });
  }

  loginSSOSync(oauth) {
    this._setToken(oauth.token);
  }

  logoutSync() {
    this._post('logout', null);
    this.deleteToken();
  }

  getProfile(reload = false, tempToken = false) {
    if (tempToken) {
      return this._get('me', this._getTempTokenHeader());
    }
    if (reload) this.userCache.removeAll();
    return this._get('me', { cache: this.userCache });
  }

  updateProfile(user) {
    return this._put('user/profile', user).success(() => this.userCache.removeAll());
  }

  resetPassword(user) {
    return this._post('password/reset', user);
  }

  changePassword(password) {
    return this._put('user/password', password);
  }

  verifyMobile(mobile) {
    return this._post('verify/mobile', { mobile: mobile.mobile, code: mobile.code });
  }

  changeMobile(mobile) {
    this.userCache.removeAll();
    return this._put('user/mobile', { mobile: mobile.mobile, code: mobile.code, session: mobile.session });
  }

  private _setToken(token) {
    this.userCache.removeAll();
    this.utilService.setToken(token);
  }

  deleteToken() {
    this.userCache.removeAll();
    this.utilService.deleteToken();
  }

  isLoggedIn() {
    return !_.isEmpty(this.utilService.getToken());
  }

  sendFeedback(feedback) {
    return this._post('user/feedback', feedback);
  }

  updateDetail(detail) {
    return this._put('user/moreinfo', detail).success(() => this.userCache.removeAll());
  }

  getGrade(car_id) {
    return this._get(`cars/${car_id}/assess/hcz`);
  }

  getAssess(user_id) {
    return this._get(`mobile/assess/${user_id}`);
  }

  getAgreement(carId) {
    return this._get(`assess/agreement/${carId}`); // 139
  }

  getReport(car_id, stage) {
    return this._get(`reports/${car_id}/monthly/event?stage=${stage}`);
  }

  getInvitations() {
    return this._get(`invitations`);
  }

  checkIn() {
    return this._get('signin/daily');
  }

  isCheckedIn() {
    return this._get('signin/check');
  }

  checkShadowToken(token, opts = {}) {
    opts = angular.merge(opts, {
      'headers': super._getHeaders({ 'Authorization': `Bearer ${token}` })
    });
    return this._get('magic', opts);
  }

}

export class Service extends UserService {}