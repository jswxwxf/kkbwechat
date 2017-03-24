/// <reference path="../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import models = require('../../../components/models/index');
import {BaseController} from "../../../utility/base-controller";

export var controllerName = 'dvr.read.ListController';

export class ListController extends BaseController {

  podcasts = [];
  refreshcasts = [];
  pager;
  last_pager;

  newCast;
  editCast;

  showEmpty = false;

  static $inject = ['$scope', '$timeout', '$ionicScrollDelegate', common.utilService.serviceName, services.readService.serviceName];

  constructor(private $scope, private $timeout, private $ionicScrollDelegate, private utilService: common.utilService.Service, private readService: services.readService.Service) {
    super($scope, utilService);
    super.setModalSrc('add', '/features/dvr/read/add.html');
    super.setModalSrc('edit', '/features/dvr/read/edit.html');
    this.loadPodcasts().then(resp => this.showAdd());
    $scope.$on('modal.shown', () => {
      this.$ionicScrollDelegate.$getByHandle('add').scrollTop(true);
      // this.$timeout(() => {
      //   $('#content').watermark();
      // }, 5);
    });
  }

  private loadPodcasts(page?, podcasts?) {
    var current_page = this.pager ? this.pager.current_page + 1 : 1;
    if (page) current_page = page;
    if (!podcasts) podcasts = this.podcasts;
    return this.readService.getMyPodcasts(current_page).then(resp => {
      Array.prototype.push.apply(podcasts, resp.data.data);
      if (podcasts.length == 0) this.showEmpty = true;
      this.pager = resp.data.pager;
      this.$timeout(() => this.$scope.$broadcast('scroll.infiniteScrollComplete'), 100); // 要等一会儿要不然代理服务器吃不消
    });
  }

  private refreshPodcasts(page = 1) {
    if (page == 1) {
      this.refreshcasts = [];
      this.last_pager = this.pager;
      this.pager = null;
      this.showEmpty = false;
      this.utilService.showSpinner();
    }
    if (this.pager && page > this.last_pager.current_page) {
      this.podcasts = this.refreshcasts;
      this.utilService.hideSpinner();
      return;
    }
    this.loadPodcasts(page, this.refreshcasts).then(data => {
      this.refreshPodcasts(++page);
    });
  }

  hasMore() {
    if (!this.pager) return false;
    return this.pager.current_page < this.pager.last_page;
  }

  showAdd() {
    this.newCast = {};
    this.showModal('add');
  }

  add() {
    this.utilService.showSpinner();
    this.readService.addPodcast(this.newCast).then(resp => {
      this.hideModal('add');
      this.utilService.alert(resp.data.msg).then(data => {
        this.refreshPodcasts();
      });
    }).finally(() => this.utilService.hideSpinner());
  }

  showEdit(cast) {
    this.utilService.showSpinner();
    this.readService.getPodcast(cast.id).then(resp => {
      this.editCast = resp.data.data;
      this.showModal('edit');
    }).finally(() => this.utilService.hideSpinner());
  }

  remove(cast) {
    this.utilService.showSpinner();
    this.readService.deletePodcast(cast.id).then(resp => {
      this.hideModal('edit');
      this.utilService.alert(resp.data.msg).then(data => {
        this.refreshPodcasts();
      });
    }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends ListController {}