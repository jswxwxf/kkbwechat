/// <reference path="../../../lib/app.d.ts" />

'use strict';

import baseService = require('./base-service');
import common = require('../../utility/index');
import models = require('../models/index');

export var serviceName = 'readService';

class ReadService extends baseService.Service {

  static $inject = ['$q', '$http', common.utilService.serviceName];

  constructor(private $q: angular.IQService, private $http: angular.IHttpService, private utilService: common.utilService.Service) {
    super($q, $http, utilService);
  }

  getMyPodcasts(page = 1) {
    return this._get(`podcasts/mine`, { params: { page: page } });
  }

  getPodcast(id) {
    return this._get(`podcasts/${id}`);
  }

  addPodcast(cast) {
    return this._post(`podcasts`, cast);
  }

  deletePodcast(id) {
    return this._delete(`podcasts/${id}`);
  }

}

export class Service extends ReadService {}