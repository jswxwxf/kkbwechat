/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'eventsService';

class EventsService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  getHunt2Order(openid) {
    return this._get(`dcf/${openid}`);
  }

  getHunt2Beauties(position) {
    return this._post(`dcf/list`, position);
  }

  acceptHunt2(choice) {
    return this._post(`dcf/select`, choice);
  }

  uploadHunt2Photo(photo) {
    return this._post(`dcf/upload`, photo);
  }

  isFollow(openid) {
    return this._get(`comac/follow/${openid}`);
  }

  canComacDraw(openid) {
    return this._get(`comac/draw/${openid}`);
  }

  comacDraw(openid) {
    return this._post(`comac/draw`, { openid });
  }

  comacDevice(openid) {
    return this._get(`comac/device/${openid}`);
  }

  scratch(eventId = 2) {
    return this._post(`scratch/${eventId}`, null);
  }

  scratchLog(eventId = 2) {
    return this._get(`scratch/log/${eventId}`);
  }

  envelopeList(openid) {
    return this._get(`redpkg/${openid}/list`);
  }

  envelopeInfo(openid, opts?) {
    return this._get(`redpkg/${openid}/info`, opts);
  }

  envelopeDraw(openid, opts?) {
    return this._post(`redpkg/draw`, { openid }, opts);
  }

  envelopeActive(openid, envelope, opts?) {
    return this._post(`redpkg/active`, { openid, rp_id: envelope }, opts);
  }

  envelopeDetail(envelope) {
    return this._get(`redpkg/detail/${envelope}`);
  }

}

export class Service extends EventsService {}