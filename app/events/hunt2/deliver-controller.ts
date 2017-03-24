/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseHunt2Controller} from "./base-hunt2-controller";
import {Config} from "../../config/config";

export var controllerName = 'hunt2.DeliverController';

class DeliverController extends BaseHunt2Controller {

  beauties;
  beauty;
  accepted = false;

  choice: any = {
    openid: this.openid,
    source: this.source
  };

  registry: any = {
    openid: this.openid
  };

  static $inject = ['$scope', '$q', '$timeout', '$state', '$stateParams', 'ngAudio', 'openid', 'source', 'order', common.utilService.serviceName, services.eventsService.serviceName, services.registerService.serviceName, services.wechatService.serviceName];

  constructor(private $scope, private $q, private $timeout: angular.ITimeoutService, private $state: angular.ui.IStateService, private $stateParams, private ngAudio: any, private openid, private source, private order, private utilService: common.utilService.Service, private eventsService: services.eventsService.Service, private registerService: services.registerService.Service, private wechatService: services.wechatService.Service) {
    super($scope, source, utilService, wechatService);
    this.setModalSrc('photo', 'events/hunt2/photo.html');
    this.setModalSrc('register', 'events/hunt2/register-modal.html');
    this.loadBeauties();
    // Resume count down on hide modal
    //$scope.$on('modal.hidden', () => {
    //  this.$scope.$broadcast(enums.events.Events.countdown_reset);
    //});
  }

  loadBeauties() {
    this.$q.when().then(() => {
      if (Config.inWechat()) return this.wechatService.getLocation(true);
    }).then((position: any) => {
      var payload: any = { openid: this.openid };
      if (position) {
        payload.lat = position.latitude;
        payload.lon = position.longitude;
      }
      this.eventsService.getHunt2Beauties(payload).then((data: any) => {
        this.beauties = data.data.data;
        this.ngAudio.play(location.origin + '/static/audio/hunt2.mp3');
        this.showBeauty(0);
      });
    });
  }

  showBeauty(idx) {
    var beauty = this.beauties[idx];
    if (angular.isUndefined(beauty)) return;
    beauty.showFlag = true;
    this.$timeout(() => {
      idx = idx + 1;
      this.showBeauty(idx);
    }, 1000);
  }

  showPhoto(beauty) {
    //this.$scope.$broadcast(enums.events.Events.countdown_pause);
    this.beauty = beauty;
    this.showModal('photo', { animation: 'scale-in' });
  }

  timeout($last) {
    if (!$last) return;
    if (this.accepted) return;
    if (!this.$state.is('hunt2.deliver')) return;
    this.$state.go('hunt2.ignore', this.$stateParams, { location: 'replace' });
  }

  accept(beauty) {
    this.beauty = beauty;
    if (this.source == 'yd') return this._accept();
    //this.$scope.$broadcast(enums.events.Events.countdown_pause);
    this.showModal('register');
  }

  private _accept() {
    this.accepted = true;
    this.choice.beauty_id = this.beauty.beauty_id;
    this.utilService.showSpinner();
    this.eventsService.acceptHunt2(this.choice).then(() => {
      var nextPage = 'hunt2.success';
      if (this.source == 'yd') nextPage = 'hunt2.register';
      this.$state.go(nextPage, this.$stateParams, { location: 'replace' })
    }).finally(() => this.utilService.hideSpinner())
  }

  sendCode() {
    this.registerService.sendHunt2Code(this.registry.mobile);
  }

  register() {
    this.utilService.showSpinner();
    this.registerService.registerHunt2(this.registry).success(() => this._accept()).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends DeliverController {}