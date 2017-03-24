/// <reference path="../../../lib/app.d.ts" />

'use strict';

import common = require('../../utility/index');
import services = require('../../components/services/index');
import models = require('../../components/models/index');
import enums = require('../../enums/index');
import {BaseHunt2Controller} from "./base-hunt2-controller";

export var controllerName = 'hunt2.SelfieController';

class SelfieController extends BaseHunt2Controller {

  photo: any = {
    openid: this.openid
  };

  static $inject = ['$scope', '$state', '$stateParams', 'ngAudio', 'openid', 'source', 'order', common.utilService.serviceName, services.wechatService.serviceName, services.eventsService.serviceName];

  constructor(private $scope, private $state: angular.ui.IStateService, $stateParams, private ngAudio: any, private openid, private source, private order, private utilService: common.utilService.Service, private wechatService: services.wechatService.Service, private eventsService: services.eventsService.Service) {
    super($scope, source, utilService, wechatService);
  }

  takePicture() {
    this.wechatService.takePicture().then((res: any) => {
      this.photo.media_id = res.serverId;
      this.utilService.showSpinner();
      this.eventsService.uploadHunt2Photo(this.photo).then((data) => {
        this.shareImg = data.data.data.img;
        $('#selfiephoto').attr('src', res.localId || this.shareImg);
        this.subscribeOnShare();
      }).finally(() => this.utilService.hideSpinner());
    });
  }

}

export class Controller extends SelfieController {}