/// <reference path="../../lib/app.d.ts" />

'use strict';

import common = require('./index');
import {Utils} from "./index";

export abstract class BaseController extends Utils {

  lcbUtils = Utils;

  /**
   * models
   */

  private _modals = {};

  private _getModal(k) {
    var modal = this._modals[k];
    if (angular.isUndefined(modal)) {
      modal = {};
      this._modals[k] = modal;
    }
    return modal;
  }

  setModalSrc(k, src) {
    this._getModal(k).src = src;
  }

  showModal(k, options = {}) {
    var modal = this._getModal(k);
    if (angular.isUndefined(modal.src)) {
      alert('Model src must be set!');
    }
    return this.baseUtilService.showModal(modal.ctrl, modal.src, this.$baseScope, options).then((ctrl) => {
      modal.ctrl = ctrl;
    });
  }

  hideModal(k) {
    var ctrl = this._getModal(k).ctrl;
    if (ctrl) {
      ctrl.hide();
    }
  }

  /**
   * models
   */

  private _popovers = {};

  private _getPopover(k) {
    var popover = this._popovers[k];
    if (angular.isUndefined(popover)) {
      popover = {};
      this._popovers[k] = popover;
    }
    return popover;
  }

  setPopoverSrc(k, src) {
    this._getPopover(k).src = src;
  }

  showPopover(k, $event) {
    var popover = this._getPopover(k);
    if (angular.isUndefined(popover.src)) {
      alert('Model src must be set!');
    }
    this.baseUtilService.showPopover(popover.ctrl, popover.src, this.$baseScope, $event).then((ctrl) => {
      popover.ctrl = ctrl;
    });
  }

  hidePopover(k) {
    var ctrl = this._getPopover(k).ctrl;
    if (ctrl) {
      ctrl.hide();
    }
  }

  isEmpty(v) {
    return _.isEmpty(v);
  }

  constructor(private $baseScope: angular.IScope, private baseUtilService: common.utilService.Service) {
    super();
    this.setModalSrc('sharemask', '/features/share/masks/share.html');
    this.setModalSrc('samplelicensemask', '/features/share/masks/sample-license.html');
  }

  showMask(k) {
    this.showModal(k, { animation: 'scale-in' });
  }

  downloadApp() {
    location.assign(`//www.kaikaibao.com.cn/app/download/`);
  }

}