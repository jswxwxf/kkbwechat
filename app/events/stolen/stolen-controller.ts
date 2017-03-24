/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import {BaseController} from "../../utility/base-controller";

export var controllerName = 'stolen.StolenController';

class StolenController extends BaseController {

  stolen: any = {};
  ukey;
  sourceWeixin;
  bgmusic;

  static $inject = ['$scope', '$state', '$stateParams', 'ngAudio', common.utilService.serviceName, services.insuranceService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, private $stateParams, private ngAudio: any, private utilService: common.utilService.Service, private insuranceService: services.insuranceService.Service, private wechatService: services.wechatService.Service) {

    super($scope, utilService);
    this.setModalSrc('agreement', '/events/stolen/agreement.html');

    if (!$stateParams.source) {
      $stateParams.source = 'W01';
      this.$state.go(this.$state.$current, $stateParams);
      return;
    }

    this.stolen.source = $stateParams.source;
    this.stolen.openid = $stateParams.openid;

    this.sourceWeixin = _.startsWith(this.stolen.source, 'W');
    super.setPopoverSrc('rule', this.sourceWeixin ? '/events/stolen/wrule.html' : '/events/stolen/arule.html');
    if (!this.stolen.openid && this.sourceWeixin) {
      this.wechatService.redirectForOpenId(location.href);
      return;
    }

    this.subscribeOnShare();

    this.bgmusic = ngAudio.play('http://7xptzz.com2.z0.glb.qiniucdn.com/bgmusic.mp3');
    this.bgmusic.loop = true;

  }

  sendCode() {
    return this.insuranceService.sendStolenCode(this.stolen.mobile);
  }

  apply() {
    this.utilService.showSpinner();
    this.insuranceService.applyStolen(this.stolen).success((data) => {
      this.ukey = data.data.ukey;
      this.$state.go('stolen.success');
    }).finally(() => this.utilService.hideSpinner());
  }

  subscribeOnShare() {
    this.wechatService.getJsSDK().then((jweixin: any) => {
      jweixin.onMenuShareTimeline({
        title: '春节，你回家看爹，我帮你看（kān）车',
        link: `http://m.kaikaibao.com.cn/wxevtlnk?state=stolen.intro&source=${this.stolen.source}`,
        imgUrl: 'http://m.kaikaibao.com.cn/static/images/stolen/icon.png',
        success: () => {
          if (!this.ukey || !this.sourceWeixin) return;
          this.insuranceService.activeStolen(this.ukey);
        },
        fail: (res) => {
          alert('failed: ' + angular.toJson(res));
        }
      });
      jweixin.onMenuShareAppMessage({
        title: '春节，你回家看爹，我帮你看（kān）车',
        desc: '<免费领取>开开保8万元春节车辆盗抢补偿。春节出去嗨勿忘财产安全哦！',
        link: `http://m.kaikaibao.com.cn/wxevtlnk?state=stolen.intro&source=${this.stolen.source}`,
        imgUrl: 'http://m.kaikaibao.com.cn/static/images/stolen/icon.png',
        fail: (res) => {
          alert('failed: ' + angular.toJson(res));
        }

      });
      jweixin.onMenuShareQQ({
        title: '春节，你回家看爹，我帮你看（kān）车',
        desc: '<免费领取>开开保8万元春节车辆盗抢补偿。春节出去嗨勿忘财产安全哦！',
        link: `http://m.kaikaibao.com.cn/wxevtlnk?state=stolen.intro&source=${this.stolen.source}`,
        imgUrl: 'http://m.kaikaibao.com.cn/static/images/stolen/icon.png',
        fail: (res) => {
          alert('failed: ' + angular.toJson(res));
        }

      });
    });
  }

  getWidth () {
    return $(window).width() + 'px';
  }

  getHeight() {
    return $(window).height() + 'px';
  }

  getTotalHeight () {
    return ($(window).height() * 5) + 'px';
  }

  getLogoUrl() {
    var source = this.stolen.source.toUpperCase();
    if (!_.contains(['A03', 'W04', 'W05', 'W11'], source)) source = 'W01';
    return `static/images/stolen/${source}.png`;
  }

  showOverlay () {
    $('#lcb-stolen-overlay').show();
  }

  hideOverlay () {
    $('#lcb-stolen-overlay').hide();
  }

  toggleBGM () {
    if(this.bgmusic.paused) {
      this.bgmusic.play();
    } else {
      this.bgmusic.pause();
    }
  }

}

export class Controller extends StolenController {}