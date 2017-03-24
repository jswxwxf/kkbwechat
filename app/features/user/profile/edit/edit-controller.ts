/// <reference path="../../../../../lib/app.d.ts" />

'use strict';

import common = require('../../../../utility/index');
import services = require('../../../../components/services/index');
import models = require('../../../../components/models/index');
import enums = require('../../../../enums/index');
import {BaseController} from "../../../../utility/base-controller";

export var controllerName = 'user.profile.EditController';

class EditController extends BaseController {

  user: models.user.Model = null;
  editUser: models.user.Model = null;

  password = null; /* { password, code } */
  mobile = null; /* { mobile, code, session } */

  page = null;
  pageUrl = null;
  pageTitles = {
    username: '修改用户名',
    password: '修改登录密码',
    id: '修改份证',
    name: '完善姓名'
  };

  static $inject = ['$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', 'profile', common.utilService.serviceName, services.userService.serviceName];

  constructor(private $scope, private $state, private $stateParams, private $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate, private profile, private utilService: common.utilService.Service, private userService: services.userService.Service) {
    super($scope, utilService);
    this.user = profile.data.data;
    this.editUser = angular.copy(this.user);
    this.page = $stateParams.page;
    this.pageUrl = ['features/user/profile/edit/edit-', this.page, '.html'].join('');
  }

  sendChangeMobileCode(mobile) {
    this.userService.sendChangeMobileCode(mobile.mobile);
  }

  verifyMobile(mobile) {
    this.utilService.showSpinner();
    return this.userService.verifyMobile(mobile).success((data) => {
      mobile.session = data.session;
      this.$ionicSlideBoxDelegate.next();
    }).finally(() => this.utilService.hideSpinner());
  }

  changeMobile() {
    this.verifyMobile(this.mobile).then((data) => {
      this.utilService.showSpinner();
      this.userService.changeMobile(this.mobile).success(() => this.$state.go('user.profile', null, { reload: true })).finally(() => this.utilService.hideSpinner());
    })
  }

  edit() {
    this['edit_' + this.page]().then(() => this.$state.go('user.profile', null, { location: 'replace', reload: true }));
  }

  edit_username() {
    this.utilService.showSpinner();
    return this.userService.updateProfile({ username: this.editUser.name }).success(() => this.$scope.$root.$broadcast(enums.events.Events.user_updated)).finally(() => this.utilService.hideSpinner());
  }

  edit_password() {
    this.utilService.showSpinner();
    return this.userService.changePassword(this.password).success(() => this.utilService.alert('密码修改成功')).finally(() => this.utilService.hideSpinner());
  }

  edit_id() {
    this.utilService.showSpinner();
    return this.userService.updateProfile({ id_card: this.editUser.id_card }).finally(() => this.utilService.hideSpinner());
  }

  edit_name() {
    this.utilService.showSpinner();
    return this.userService.updateProfile({ realname: this.editUser.realname }).finally(() => this.utilService.hideSpinner());
  }

}

export class Controller extends EditController {}