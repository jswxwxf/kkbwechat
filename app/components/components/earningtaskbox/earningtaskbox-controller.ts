'use strict';

import common = require('../../../utility/index');
import services = require('../../../components/services/index');
import {BaseController} from "../../../utility/base-controller";

class EarningTaskboxController extends BaseController {

  tasks;

  showUntil = 3;

  static $inject = ['$scope', '$timeout', '$location', '$stateParams', '$ionicScrollDelegate', common.utilService.serviceName, services.dvrService.serviceName];

  constructor(public $scope, private $timeout, private $location, private $stateParams, private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate, private utilService: common.utilService.Service, private dvrService: services.dvrService.Service) {
    super($scope, utilService);
  }

  shouldShow(index) {
    return index < this.showUntil;
  }

  showAll() {
    this.showUntil = this.tasks.length;
    this.$timeout(() => this.$ionicScrollDelegate.resize(), 0);
  }

  $onInit() {
    this.utilService.showSpinner();
    this.dvrService.getCreditTasks(this.$stateParams).then(data => this.tasks = data.data.data.tasks).finally(() => this.utilService.hideSpinner());
  }

  handleTask(task) {
    var path = task.url.split('#')[1];
    this.$location.path(path);
  }

}

export class Controller extends EarningTaskboxController {}