/// <reference path="../../lib/app.d.ts" />

'use strict';

import storeService = require('./store-service');
import {Utils} from "./index";
import {Config} from "../config/config";
import {DatetimePickerController} from "./datetime-picker/datetime-picker-controller";

export var serviceName = 'utilService';

class UtilService {

  static $inject = ['$q', '$rootScope', '$ionicLoading', '$ionicModal', '$ionicPopover', '$ionicPopup', '$ionicHistory', '$state', '$cookies', '$window', '$location', 'ionicToast', storeService.serviceName];

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private $ionicLoading: ionic.loading.IonicLoadingService,
    private $ionicModal: ionic.modal.IonicModalService,
    private $ionicPopover: ionic.popover.IonicPopoverService,
    private $ionicPopup: ionic.popup.IonicPopupService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $state: angular.ui.IStateService,
    private $cookies: angular.cookies.ICookiesService,
    private $window: angular.IWindowService,
    private $location: angular.ILocationService,
    private ionicToast,
    private storeService: storeService.Service) { }

  showSpinner(message?, ops = {}) {
    if (message) ops['template'] = message;
    ops = angular.extend({
      // delay: 500
    }, ops);
    this.$ionicLoading.show(ops);
  }

  hideSpinner() {
    this.$ionicLoading.hide();
  }

  handleNoCar() {
    return this.$ionicLoading.show({
      template: '<div ui-sref="user.car.add">系统还没有配置车辆，点击添加车辆</div>'
    })
  }

  handleLogin() {
    if (Config.inWechat()) {
      if (this['_handleLoginRedirected']) return;
      var redirectUri = '#/token';
      // 转出转入的参数
      if (this.$location.search().token) redirectUri += `?${$.param(this.$location.search())}`;
      var url = `${Config.ssoUrl}?redirect_uri=${encodeURIComponent([Config.baseUrl, redirectUri].join('/'))}`;
      location.replace(url);
      this['_handleLoginRedirected'] = true;
      return;
    }
    if (this.$location.search().rvm) {
      return setTimeout(() => this.$location.path('/token'), 0);
    }
    if (this.$location.search().read) {
      return setTimeout(() => this.$location.path('/token'), 0);
    }
    this.$state.go('login');
  }
  
  handleShadowLogin() {
    if (this.getToken()) return;
    var url = `${Config.ssoUrl}?redirect_uri=${encodeURIComponent([Config.baseUrl, '#/token'].join('/'))}`;
  }

  replaceState(state, params?, opts = {}) {
    if (this.$location.path() == '/' + state.replace(/\./g, '/')) return;
    opts = angular.extend({ location: 'replace' }, opts);
    setTimeout(() => this.$state.go(state, params, opts), 0);
  }

  replaceUrl(url) {
    this.$location.url(url);
    this.$location.replace();
  }

  /**
   * 各种弹窗
   */

  showPopover(popover: ionic.popover.IonicPopoverController, url, scope, $event) {
    var deferred = this.$q.defer();
    if (popover) {
      popover.show($event);
      return deferred.promise;
    }
    this.$ionicPopover.fromTemplateUrl(url, { scope: scope }).then((ctrl: ionic.popover.IonicPopoverController) => {
      deferred.resolve(ctrl);
      scope.$on('$destroy', function() {
        ctrl['remove']();
      });
      ctrl.show($event);
    });
    return deferred.promise;
  }

  showModal(modal: ionic.modal.IonicModalController, url, scope, options: any = {}) {
    var deferred = this.$q.defer();
    if (modal) {
      modal.show();
      return deferred.promise;
    }
    if (!options.scope) options.scope = scope;
    this.$ionicModal.fromTemplateUrl(url, options).then((ctrl: ionic.modal.IonicModalController) => {
      deferred.resolve(ctrl);
      scope.$on('$destroy', function() {
        ctrl['remove']();
      });
      ctrl.show();
    });
    return deferred.promise;
  }

  confirm(message, title = '开开保', opt = {}) {
    opt = angular.merge({
      title: title,
      template: message,
      okText: '确定',
      cancelText: '取消'
    }, opt);
    return this.$ionicPopup.confirm(opt);
  }

  alert(message, opt: any = {}) {
    var title = opt.title;
    if (title == undefined) {
      title = message;
      message = '';
    }
    return this.$ionicPopup.alert(angular.extend({
      title,
      template: message,
      okText: '确定'
    }, opt));
  }

  popup(opt = {}, ctrl) {
    return this.$ionicPopup.show(angular.extend({
      title: '开开保',
      buttons: [{
          text: '取消',
          type: "button-stable",
          onTap: () => ctrl.cancel()
        }, {
          text: '确定',
          type: "button-positive",
          onTap: () => ctrl.ok()
        }
      ]
    }, opt));
  }

  toast(message, opts?) {
    opts = angular.merge({
      position: 'bottom',
      stick: false,
      timeout: 4000,
      background: null
    }, opts || {});
    this.ionicToast.show(message, opts.position, opts.stick, opts.timeout, opts.background);
  }

  hideToast() {
    this.ionicToast.hide();
  }

  datetimePicker(scope, opt: any = {}) {
    scope = scope.$new();
    var ctrl = new DatetimePickerController(scope, opt);
    scope['ctrl'] = ctrl;
    return this.popup({
      templateUrl: "utility/datetime-picker/datetime-picker-popup.html",
      title: opt.title || ctrl.getDefaultTitle(),
      subTitle: opt.subTitle || "",
      scope: scope,
      cssClass: 'lcb-datetime-picker-popup'
    }, ctrl);
  }

  /**
   * 处理 登录 和 页面回转
   */

  rememberState(state, params) {
    if (Config.isPhantomState(state)) return;
    if (Config.inWechat()) {  // 微信端因为有页面跳转, 需要把返回 state 存到 localstorage
      this.storeService.storeItem('targetView', {
        toState: state.name,
        toParams: params
      });
      return;
    }
    this.$rootScope['targetView'] = {
      toState: state.name,
      toParams: params
    }
  }

  returnBack(defaultState, params = {}, options: any = {}) {
    options = angular.extend({
      inherit: true,
      lcb_inherit: true
    }, options);
    var targetView = this.$rootScope['targetView'];
    if (Config.inWechat()) {
      targetView = this.storeService.getItem('targetView');
    }
    if (!targetView) targetView = { toState: defaultState };
    if (options.lcb_inherit) {
      params = angular.merge(targetView.toParams || {}, params);
    }
    if (targetView) {
      // 定单列表特殊，因为微信支付要检查当前 url
      if (targetView.toState == 'order.list') {
        return location.href = `${location.origin}/order-list`;
      }
      this.$state.go(targetView.toState, params, options);
    }
  }

  /**
   * 把 token 存储逻辑放到这里是为了让其他的 service 解绑对存储位置的依赖
   */

  getToken() {
    // iOS/Android 端会往 WebView 的 cookie 里存当前应用端登录的 token
    var token = this.$cookies.get('kkb-token');
    if (token) {
      this.setToken(token);
      this.$cookies.remove('kkb-token');
    }
    return this.storeService.getToken();
  }

  setToken(token) {
    this.storeService.setToken(token);
  }

  deleteToken() {
    this.storeService.deleteToken();
  }

}

export class Service extends UtilService {}
